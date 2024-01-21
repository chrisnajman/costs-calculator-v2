export default function costsInput() {
  const costsForm = document.getElementById("costs-form")
  const inputDate = document.querySelector("[data-input-date]")
  const inputItem = document.querySelector("[data-input-items]")
  const inputPounds = document.querySelector("[data-input-pounds]")
  const inputPence = document.querySelector("[data-input-pence]")
  const inputNumbers = document.querySelectorAll("[data-input-number]")

  costsForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Items bought, default value is "Shopping"
    const itemValue = inputItem.value

    const dateValue = inputDate.value
    const dateArray = dateValue.split("-")
    const dateString = dateArray.reverse().join("/")

    const gbp = "\u00A3"
    if (inputPounds.value === "") {
      alert(`Enter 0 or greater in the ${gbp} field`)
      return
    }
    if (inputPence.value === "") {
      alert("Enter a number between 0 and 99 in the Pence field")
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
}
