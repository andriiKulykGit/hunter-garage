import tippy from "tippy.js";

export function init() {
	tippy("[data-title]", {
		content(reference) {
			return reference.getAttribute("data-title")
		},
	})
}
