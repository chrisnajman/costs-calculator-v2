export const deleteAllBtn = document.querySelector("[data-delete-all-entries]")
export default function deleteAllEntries() {
  deleteAllBtn.addEventListener("click", (e) => {
    if (
      window.confirm(
        "Do you really want to delete all entries and reset currency to GBP?"
      )
    ) {
      window.localStorage.clear()
      window.location.reload()
    }
  })
}
export function enableDeleteAllBtn(entries) {
  if (entries.length > 0) {
    deleteAllBtn.removeAttribute("disabled")
  }
}
