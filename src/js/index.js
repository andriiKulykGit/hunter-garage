"use strict"

import "./modules/accordion"
import "./modules/carousel"
import "./modules/dropdown"
import "./modules/info"
import "./modules/read-more"
import "./modules/show-all"
import "./modules/tables"
import { videoPlayer, portfolioGalley } from "./modules/lightbox"
import * as tooltip from "./modules/tooltip"
import lozad from "./libs/lozad"

document.addEventListener("DOMContentLoaded", () => {
	lozad().observe()
	videoPlayer.init()
	portfolioGalley.init()
	tooltip.init()
})
