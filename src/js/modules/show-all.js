document.querySelectorAll("._show-all").forEach(btn => {
	btn.addEventListener("click", () => {
		const items = document.querySelector(btn.getAttribute("data-target")).children

		for (let i = 0; i < items.length; i++) {
			items[i].removeAttribute("hidden")
		}

		btn.remove()
	})
})
