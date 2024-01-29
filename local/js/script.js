const LOCAL_STORAGE_PREFIX = "COSTS_v2_LOCAL"
const THEME_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-switcher`
const CURRENCY_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-currency`
const COSTS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-entries`
const SORT_DATE_BUTTONS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-sort-buttons-enabled`

themeSwitcher()
function themeSwitcher() {
  const btnThemeToggle = document.getElementById("btn-theme-toggle")
  const themeLightMode = document.getElementById("theme-lightmode")
  const themeDarkMode = document.getElementById("theme-darkmode")
  const root = document.querySelector("html")
  const mode = document.getElementById("mode")

  btnThemeToggle.addEventListener("click", (e) => {
    e.preventDefault()

    root.classList.toggle("light-theme")

    const isLightMode = root.classList.contains("light-theme")

    e.target.setAttribute("aria-pressed", String(isLightMode))
    if (isLightMode) {
      lightModeStyle()
    } else {
      darkModeStyle()
    }

    const lightClass = themeLightMode.classList.contains("hide") ? "hide" : ""
    const darkClass = themeDarkMode.classList.contains("hide") ? "hide" : ""

    const themeItems = [isLightMode, lightClass, darkClass]
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeItems))
  })

  function setTheme() {
    const activeTheme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)) || [
      false,
      "",
      "",
    ]

    const isLightMode = activeTheme[0]

    if (isLightMode) {
      root.classList.add("light-theme")
      lightModeStyle()
    } else {
      root.classList.remove("light-theme")
      darkModeStyle()
    }

    btnThemeToggle.setAttribute("aria-pressed", String(isLightMode))
  }

  function lightModeStyle() {
    themeDarkMode.classList.add("hide")
    themeLightMode.classList.remove("hide")
    mode.textContent = "off"
  }

  function darkModeStyle() {
    themeLightMode.classList.add("hide")
    themeDarkMode.classList.remove("hide")
    mode.textContent = "on"
  }

  setTheme()
}

/* ///////////////////////////////////////////////////////////////////////// */
loadingAnimation()
function loadingAnimation() {
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader")
    const pageLoaded = document.getElementById("page-loaded")

    loader.classList.add("loader-hidden")

    loader.addEventListener("transitionend", () => {
      loader.remove()

      // For screen readers
      pageLoaded.textContent = "Page has loaded."
      pageLoaded.setAttribute("aria-hidden", "false")
    })
  })
}

/* ///////////////////////////////////////////////////////////////////////// */
currencySelector()
function currencySelector() {
  const currencySelect = document.getElementById("currency-select")
  const selectedCurrency = document.querySelectorAll("[data-selected-currency]")
  const gbp = "\u00A3",
    eur = "\u20AC",
    usd = "\u0024",
    aud = "\u0024",
    jpy = "\u00A5",
    cny = "\u5143",
    inr = "\u20A8"

  const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) || "GBP"
  currencySelect.value = storedCurrency
  updateSelectedCurrency(storedCurrency)

  currencySelect.addEventListener("change", (e) => {
    const selectedValue = e.target.value
    updateSelectedCurrency(selectedValue)
    localStorage.setItem(CURRENCY_STORAGE_KEY, selectedValue)
  })

  function updateSelectedCurrency(currencySymbol) {
    selectedCurrency.forEach((currency) => {
      switch (currencySymbol) {
        case "GBP":
          currency.textContent = `${gbp}`
          break
        case "EUR":
          currency.textContent = `${eur}`
          break
        case "USD":
          currency.textContent = `${usd}`
          break
        case "AUD":
          currency.textContent = `${aud}`
          break
        case "JPY":
          currency.textContent = `${jpy}`
          break
        case "CNY":
          currency.textContent = `${cny}`
          break
        case "INR":
          currency.textContent = `${inr}`
          break
        default:
          currency.textContent = `${gbp}`
      }
    })
  }
}
/* ///////////////////////////////////////////////////////////////////////// */
costsCalculator()
function costsCalculator() {
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
}

/* ///////////////////////////////////////////////////////////////////////// */
function globalEventListener(type, selector, callback, option = false) {
  document.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e)
    },
    option
  )
}
