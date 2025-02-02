const strToBool = value => value.toLowerCase() === "true"

function hideSubmenus(selector) {
	document.querySelectorAll(selector).forEach(menu => menu.setAttribute("hidden", ""))
}

export { strToBool, hideSubmenus }
