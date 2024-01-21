const SORT_DATE_BUTTONS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-sort-buttons-enabled`
const sortButtons = document.querySelectorAll(".sort-button")

addGlobalEventListener("click", "[data-delete-row]", (e) => {
  // Remove from the screen
  const parent = e.target.closest(".table-row")
  parent.remove()

  // Remove from local storage
  const entryId = parent.dataset.entryId

  entries = entries.filter((entry) => {
    return entry.id !== entryId
  })

  updateEntriesInLocalStorage()
  checkAndUpdateSortButtons()
})

function updateEntriesInLocalStorage() {
  setEntries(entries)
  displayTablerowsAndSetItem()

  if (entries.length >= 2) {
    localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "true")
  } else {
    localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "false")
  }
}

function setEntries(newEntries) {
  entries = newEntries
}

function displayTablerowsAndSetItem() {
  displayTableRows(entries)
  localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries))
  if (entries.length >= 2) {
    enableSortButton()
    localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "true")
  } else {
    disableSortButton()
    localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "false")
  }
}

function enableSortButton() {
  sortButtons.forEach((button) => {
    button.removeAttribute("disabled")
  })

  localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "true")
}

function disableSortButton() {
  sortButtons.forEach((button) => {
    button.setAttribute("disabled", "true")
  })

  localStorage.setItem(SORT_DATE_BUTTONS_STORAGE_KEY, "false")
}

/* On page load */
const areSortButtonsEnabled = localStorage.getItem(
  SORT_DATE_BUTTONS_STORAGE_KEY
)
if (areSortButtonsEnabled && areSortButtonsEnabled === "true") {
  enableSortButton()
} else {
  disableSortButton()
}
