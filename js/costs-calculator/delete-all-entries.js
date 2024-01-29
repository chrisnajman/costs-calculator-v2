export const deleteAllBtn = document.querySelector("[data-delete-all-entries]")

export default function deleteAllEntries() {
  deleteAllBtn.addEventListener("click", () => {
    if (window.confirm("Do you really want to delete all entries?")) {
      const keysToRemove = [
        "COSTS_v2_GH-entries",
        "COSTS_v2_GH-sort-buttons-enabled",
      ]

      keysToRemove.forEach((keyToRemove) => {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key.startsWith(keyToRemove)) {
            localStorage.removeItem(key)
          }
        }
      })
      window.location.reload()
    }
  })
}

export function enableDeleteAllBtn(entries) {
  if (entries.length > 0) {
    deleteAllBtn.removeAttribute("disabled")
  }
}
