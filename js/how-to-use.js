export default function howToUse() {
  const details = document.getElementById("details")
  const summary = document.getElementById("summary")
  const summaryStatus = document.getElementById("summary-status")

  const closeDetails = document.getElementById("close-details")

  details.addEventListener("toggle", () => {
    // Note: the browser adds and removes the 'open' attribute
    if (details.open) {
      summary.setAttribute("aria-expanded", "true")
      summaryStatus.textContent = "Close"
    } else {
      summary.setAttribute("aria-expanded", "false")
      summaryStatus.textContent = "Open"
    }
  })

  closeDetails.addEventListener("click", () => {
    details.removeAttribute("open")
    summary.setAttribute("aria-expanded", "false")
    summaryStatus.textContent = "Open"
  })
}
