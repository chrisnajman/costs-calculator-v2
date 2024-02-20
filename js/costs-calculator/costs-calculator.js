import { COSTS_STORAGE_KEY, SORT_DATE_BUTTONS_STORAGE_KEY } from "../globals.js"
import globalEventListener from "../global-event-listener.js"
import deleteAllEntries, {
  deleteAllBtn,
  enableDeleteAllBtn,
} from "./delete-all-entries.js"
import { expandTableBtn, enableExpandTableBtn } from "./expand-table.js"
import currencySelector from "./currency-selector.js"

deleteAllBtn.setAttribute("disabled", "")
deleteAllEntries()

expandTableBtn.setAttribute("disabled", "")

export default function costsCalculator() {
  const costsForm = document.getElementById("costs-form")
  const inputDate = document.querySelector("[data-input-date]")
  const inputItem = document.querySelector("[data-input-items]")
  const inputPounds = document.querySelector("[data-input-pounds]")
  const inputPence = document.querySelector("[data-input-pence]")
  const inputNumbers = document.querySelectorAll("[data-input-number]")

  const tbodyRows = document.querySelector("[data-rows]")
  const totalDays = document.querySelector("[data-total-days]")
  const totalCosts = document.querySelector("[data-total-costs]")
  const averageSpend = document.querySelector("[data-average-spend]")

  const costsTemplate = document.getElementById("costs-template")

  const sortButton = document.querySelector("[data-sort-button]")
  sortButton.setAttribute("disabled", "")

  costsForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Default value = "Shopping"
    const itemValue = inputItem.value

    const dateValue = inputDate.value
    const dateArray = dateValue.split("-")
    const dateString = dateArray.reverse().join("/")

    if (inputPounds.value === "") {
      alert(`Enter a number greater than or equal to zero`)
      return
    }
    if (inputPence.value === "") {
      alert("Enter a number between 0 and 99")
      return
    }

    const poundsValue = parseInt(inputPounds.value) * 100
    const penceValue = parseInt(inputPence.value)
    const poundsPlusPence = (poundsValue + penceValue) / 100

    const newCostsEntry = {
      date: dateString,
      item: itemValue,
      poundsPlusPence: poundsPlusPence,
      id: new Date().valueOf().toString(),
    }
    entries.push(newCostsEntry)
    renderCostsEntry(newCostsEntry)

    saveentries()

    inputDate.value = ""
    inputItem.value = "Shopping"
    inputPounds.value = 0
    inputPence.value = 0
  })

  // Clear inputs on click
  inputItem.addEventListener("click", (e) => {
    e.target.value = ""
  })
  inputNumbers.forEach((number) => {
    number.addEventListener("click", (e) => {
      e.target.value = ""
    })
  })

  const dailyCostsAll = []

  function renderCostsEntry(entry) {
    const templateClone = costsTemplate.content.cloneNode(true)
    const costsRow = templateClone.querySelector(".costs-row")

    costsRow.dataset.entryId = entry.id

    const date = templateClone.querySelector("[data-date]")
    const itemsType = templateClone.querySelector("[data-item-type]")
    const dailyCost = templateClone.querySelector("[data-daily-cost]")

    const dateParts = entry.date.split("/")
    const parsedDate = new Date(
      `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`
    )
    date.textContent = parsedDate.toLocaleDateString("en-GB")
    dailyCost.textContent = entry.poundsPlusPence.toFixed(2)

    itemsType.textContent = entry.item

    const totalRows = parseInt(tbodyRows.rows.length + 1)
    totalDays.textContent = totalRows

    dailyCostsAll.push(parseFloat(dailyCost.textContent))
    const costsReduce = dailyCostsAll.reduce((total, cost) => {
      return total + cost
    }, 0)
    totalCosts.textContent = costsReduce.toFixed(2)

    const totalCostsNum = parseFloat(totalCosts.textContent)
    averageSpend.textContent = (totalCostsNum / totalRows).toFixed(2)

    enableSortButton()
    enableDeleteAllBtn(entries)
    enableExpandTableBtn(entries)
    costsTableScrollShadow()

    tbodyRows.appendChild(templateClone)
  }

  let entries = loadentries()
  entries.forEach((entry) => renderCostsEntry(entry))

  function saveentries() {
    localStorage.setItem(COSTS_STORAGE_KEY, JSON.stringify(entries))
  }

  function loadentries() {
    const entriesString = localStorage.getItem(COSTS_STORAGE_KEY)
    const loadedEntries = JSON.parse(entriesString) || []

    // If entries are loaded, sort them by date
    if (loadedEntries.length > 0) {
      loadedEntries.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    return loadedEntries
  }

  // Delete button
  globalEventListener("click", "[data-button-delete]", (e) => {
    // Remove from the screen
    const parent = e.target.closest(".costs-row")
    parent.remove()

    // Remove from local storage
    const entryId = parent.dataset.entryId
    entries = entries.filter((entry) => {
      return entry.id !== entryId
    })

    saveentries()
    window.location.reload()
  })

  /** Currency select */
  currencySelector()

  /** Edit items */
  globalEventListener("click", "[data-button-type-edit]", (e) => {
    e.target.textContent =
      e.target.textContent === "Edit" ? "Save edit" : "Edit"
    const parent = e.target.closest(".costs-row")

    const text = parent.querySelector("[data-item-type]")
    text.toggleAttribute("contenteditable")

    const entryId = parent.dataset.entryId
    const entry = entries.find((ent) => {
      return ent.id === entryId
    })

    entry.edited = !text.hasAttribute("contenteditable")
    if (entry.edited) entry.item = text.textContent

    localStorage.setItem(COSTS_STORAGE_KEY, JSON.stringify(entries))
  })

  /* Costs table header shadow */
  function costsTableScrollShadow() {
    const costsTableHeader = document.querySelector(
      "[data-table-heading-daily-spend]"
    )

    if (entries.length > 7) {
      costsTableHeader.classList.add("table-heading-shadow")
    }
  }

  /** SORT DATES */
  /** ========== */

  // Sort date oldest first (ascending)
  sortButton.addEventListener("click", () => {
    entries.sort((a, b) => {
      return parseDate(a.date) - parseDate(b.date)
    })
    dailyCostsAll.length = 0 // Reset the array
    saveAndRenderEntries()
  })

  // save entries and render the table
  function saveAndRenderEntries() {
    saveentries()
    // Clear existing table rows
    tbodyRows.innerHTML = ""
    // Render sorted entries
    entries.forEach((entry) => renderCostsEntry(entry))
  }

  /** 
    Enable sort button only when there are 2 or more entries; 
    disable when there are less than 2 
  */
  function enableSortButton() {
    if (entries.length >= 2) {
      sortButton.removeAttribute("disabled")
      localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "true")
    } else {
      sortButton.setAttribute("disabled", "")
      localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "false")
    }
  }

  // Function to parse date string into Date object
  function parseDate(dateString) {
    const dateArray = dateString.split("/")
    const reversedDateArray = dateArray.reverse()
    const formattedDateString = reversedDateArray.join("/")
    return new Date(formattedDateString)
  }

  // Expand table button
  expandTableBtn.addEventListener("click", (e) => {
    const entriesTableContainer = document.querySelector(
      "[data-costs-table-container]"
    )

    const entriesTableHeader = document.querySelector(
      "[data-costs-table-header]"
    )

    e.target.textContent =
      e.target.textContent === "Expand table"
        ? "Contract table"
        : "Expand table"

    entriesTableContainer.classList.toggle("table-entries-max-height")
    entriesTableHeader.classList.toggle("sticky")
  })
}
