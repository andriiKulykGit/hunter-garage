"use strict"

import "./modules/carousel"
import "./modules/dropdown"
import "./modules/info"
import "./modules/read-more"
import "./modules/show-all"
import * as tooltip from "./modules/tooltip"
import lozad from "./libs/lozad"
import videoPlayer from "./modules/lightbox"

document.addEventListener("DOMContentLoaded", () => {
	lozad().observe()
	videoPlayer.init()
	tooltip.init()
})
