if (document.querySelectorAll(".accordion__link")) {
	document.querySelectorAll(".accordion__link").forEach(btn => {
		btn.addEventListener("click", e => {
			e.preventDefault

			hideTables()

			const targetID = btn.getAttribute("aria-controls")
			document.getElementById(targetID).removeAttribute("hidden")
			document.querySelector(".search__content").classList.add("_active")
			document.querySelector(".search__aside").classList.add("_hidden")
		})
	})
}

if (document.querySelector(".search__back")) {
	document.querySelector(".search__back").addEventListener("click", () => {
		hideTables()
		document.querySelector(".search__content").classList.remove("_active")
		document.querySelector(".search__aside").classList.remove("_hidden")
	})
}

function hideTables() {
	document.querySelectorAll(".table").forEach(table => {
		table.setAttribute("hidden", "")
	})
}
