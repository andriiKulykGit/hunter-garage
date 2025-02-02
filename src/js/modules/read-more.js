document.addEventListener("click", function(e) {
	if (e.target.closest("._read-more")) {
		e.target.previousElementSibling.classList.toggle("_expanded")
		const text = e.target.getAttribute("data-second-text")
		const newText = e.target.innerText
		e.target.setAttribute("data-second-text", newText)

		e.target.textContent = e.target.textContent === text ? newText : text
	}
})
