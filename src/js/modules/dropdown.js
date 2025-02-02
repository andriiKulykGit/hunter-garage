import { strToBool, hideSubmenus } from "./utils.js"

const buttons = document.querySelectorAll("._trigger-dropdown")
buttons.forEach(button => {
	button.addEventListener("click", () => {
		toggleExpanded(button)
		const state = strToBool(button.getAttribute("aria-expanded"))

		toggleHidden(button.nextElementSibling, state)
	})
})

document.addEventListener("click", function(e) {
	const target = e.target
	if (!target.closest("._trigger-dropdown") && !target.closest(".dropdown")) {
		document.querySelectorAll(".dropdown").forEach(menu => menu.setAttribute("hidden", ""))
		buttons.forEach(trigger => trigger.setAttribute("aria-expanded", "false"))
	}
})

const items = document.querySelectorAll(".dropdown__link")
items.forEach(item => {
	item.addEventListener("mouseover", handleInteraction)
	item.addEventListener("touchend", handleInteraction)
})

function handleInteraction(e) {
	const item = e.currentTarget

	if (!item.hasAttribute("aria-expanded")) return

	hideSubmenus(".dropdown_submenu")

	const dropdown = item.nextElementSibling
	toggleHidden(dropdown, true)

	const distanceToTop = item.offsetTop - item.parentElement.offsetTop
	dropdown.style.top = `${distanceToTop}px`
}

function toggleExpanded(element) {
	element.setAttribute("aria-expanded", element.getAttribute("aria-expanded") === "false" ? "true" : "false")
}

function toggleHidden(element, state) {
	if (state) {
		element.removeAttribute("hidden")
	} else {
		element.setAttribute("hidden", "")
	}
}
