"use strict"

import "./modules/carousel"
import "./modules/dropdown"
import "./modules/read-more"
import "./modules/show-all"
import lozad from "./libs/lozad"
import videoPlayer from "./modules/lightbox"

document.addEventListener("DOMContentLoaded", () => {
	lozad().observe()
	videoPlayer.init()
})
