import Flickity from "flickity"
// import "flickity-fade"
import "flickity-bg-lazyload"

if (document.querySelector(".carousel_portfolio")) {
	var portfolioSlider = new Flickity(".carousel_portfolio", {
		pageDots: true,
		wrapAround: true,
		lazyLoad: 2,
		cellAlign: "left",
		prevNextButtons: false,
		adaptiveHeight: true,
	})
}

if (document.querySelector(".hero__carousel")) {
	var homeSlider = new Flickity(".hero__carousel", {
		prevNextButtons: false,
		draggable: false,
		cellSelector: ".hero__slide",
		adaptiveHeight: true,
		cellAlign: "center",
		pageDots: false,
		wrapAround: true,
		bgLazyLoad: 1,
	})
}

if (document.querySelector(".team__carousel")) {
	var teamSlider = new Flickity(".team__carousel", {
		prevNextButtons: false,
		cellSelector: ".team__slide",
		draggable: true,
		adaptiveHeight: false,
		cellAlign: "center",
		pageDots: false,
		wrapAround: true,
	})
}

document.addEventListener("click", function(e) {
	const target = e.target

	let initedSlider = [teamSlider, portfolioSlider, homeSlider].filter(slider => slider !== undefined)

	initedSlider.forEach(slider => {
		if (target.closest("._arrow_previous")) {
			slider.previous(true)
		} else if (target.closest("._arrow_next")) {
			slider.next(true)
		}
	})
	updateProgress()
})

function updateProgress() {
	const progress = document.querySelector(".progress")

	if (progress) {
		const value = homeSlider.selectedIndex + 1
		progress.value = value
	}
}

export { portfolioSlider, homeSlider }
