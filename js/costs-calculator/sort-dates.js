export default function sortDates(entries) {
  const LOCAL_STORAGE_PREFIX = "COSTS_v2_GH"
  const COSTS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-data`

  /** GLOBAL? */
  const tbodyRows = document.querySelector("[data-rows]")
  const dailyCostsAll = []
  /** GLOBAL? */
  function saveentries() {
    localStorage.setItem(COSTS_STORAGE_KEY, JSON.stringify(entries))
  }

  /** Sort dates */
  // Sort date oldest first (ascending) - normal output
  const btnSortDatesAsc = document.querySelector("[data-button-sort-asc]")
  btnSortDatesAsc.addEventListener("click", (e) => {
    entries.sort((a, b) => {
      return parseDate(a.date) - parseDate(b.date)
    })
    dailyCostsAll.length = 0 // Reset the array
    saveAndRenderEntries()
  })

  // Sort date most recent first (descending)
  const btnSortDatesDesc = document.querySelector("[data-button-sort-desc]")
  btnSortDatesDesc.addEventListener("click", (e) => {
    entries.sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date)
    })
    dailyCostsAll.length = 0 // Reset the array
    saveAndRenderEntries()
  })

  // Function to save entries and render the table
  function saveAndRenderEntries() {
    saveentries()
    // Clear existing table rows
    tbodyRows.innerHTML = ""
    // Render sorted entries
    entries.forEach((entry) => renderCostsEntry(entry))
  }

  //   function enableSortButton() {
  //     sortButtons.forEach((button) => {
  //       button.removeAttribute("disabled")
  //     })

  //     localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "true")
  //   }

  //   function disableSortButton() {
  //     sortButtons.forEach((button) => {
  //       button.setAttribute("disabled", "true")
  //     })

  //     localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "false")
  //   }

  /** Helper functions */
  // Function to parse date string into Date object
  function parseDate(dateString) {
    const dateArray = dateString.split("/")
    const reversedDateArray = dateArray.reverse()
    const formattedDateString = reversedDateArray.join("/")
    return new Date(formattedDateString)
  }
}
