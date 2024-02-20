export const expandTableBtn = document.querySelector("[data-expand-table]")
export function enableExpandTableBtn(entries) {
  if (entries.length > 7) {
    expandTableBtn.removeAttribute("disabled")
  }
}
