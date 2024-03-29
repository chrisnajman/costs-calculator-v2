import { THEME_STORAGE_KEY } from "./globals.js"

export default function themeSwitcher() {
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
