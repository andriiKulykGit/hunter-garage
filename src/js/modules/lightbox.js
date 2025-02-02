import PhotoSwipeLightbox from "photoswipe/lightbox"

const videoPlayer = new PhotoSwipeLightbox({
	gallery: ".video",
	children: ".video__link",
	pswpModule: () => import("photoswipe"),
})

videoPlayer.addFilter("itemData", item => {
	const videoID = parseMediaURL(item.element)

	videoID && (item.videoID = videoID)

	return item
})

videoPlayer.on("contentLoad", e => {
	const { content } = e
	if (content.type === "youtube-video") {
		e.preventDefault()

		const iframe = createIframe(content.data.videoID)

		content.element = document.createElement("div")
		content.element.className = "pswp__youtube-video-container"

		content.element.appendChild(iframe)
	}
})

function parseMediaURL(elm) {
	let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i
	let url = elm.href
	let match = url.match(regexp)

	return match[1]
}

function createIframe(id) {
	let iframe = document.createElement("iframe")

	iframe.setAttribute("allowfullscreen", "")
	iframe.setAttribute("allow", "autoplay")
	iframe.setAttribute("src", generateURL(id))
	iframe.classList.add("iframe-video")

	return iframe
}

function generateURL(id) {
	let query = "?rel=0&showinfo=0&autoplay=1"

	return "https://www.youtube.com/embed/" + id + query
}

export default videoPlayer
