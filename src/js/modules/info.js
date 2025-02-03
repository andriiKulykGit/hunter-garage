const triggers = document.querySelectorAll(".info__item")

triggers.forEach(item => {
	item.addEventListener("click", (e) => {
		e.preventDefault()

		removeActive()

		const targetID = item.getAttribute("aria-controls")
		const target = document.getElementById(targetID)

		target.removeAttribute("hidden")
		item.classList.add("_active")
	})
})

function removeActive() {
	const mediaItems = document.querySelectorAll(".info__media")

	mediaItems.forEach(item => {
		item.setAttribute("hidden", "")
	})
	triggers.forEach(item => {
		item.classList.remove("_active")
	})
}
