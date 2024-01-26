import { CURRENCY_STORAGE_KEY } from "../globals.js"

export default function currencySelector() {
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
