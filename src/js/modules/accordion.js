import { strToBool } from "./utils.js"

const accordions = document.querySelectorAll(".accordion")
accordions.forEach(accordion => {
	accordion.addEventListener("click", (e) => {

		if(!e.target.closest(".accordion__btn")) return

		const btn = accordion.querySelector(".accordion__btn")
		const state = strToBool(btn.getAttribute("aria-expanded"))
		const targetID = btn.getAttribute("aria-controls")
		const target = document.getElementById(targetID)

		closeAccordions()

		btn.setAttribute("aria-expanded", !state)

		if (state) {
			target.setAttribute("hidden", "")
		} else {
			target.removeAttribute("hidden")
		}

		function closeAccordions() {
			accordions.forEach(accordion => {
				const btn = accordion.querySelector(".accordion__btn")
				const targetID = btn.getAttribute("aria-controls")
				const target = document.getElementById(targetID)

				btn.setAttribute("aria-expanded", false)
				target.setAttribute("hidden", "")
			})
		}
	})
})
