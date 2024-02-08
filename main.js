// ==UserScript==
// @name         ChatGPT CSS fixes
// @version      2024-02-08
// @namespace    http://tampermonkey.net/
// @description  Adjusts width of side bar and messages of the chatGPT web interface
// @author       alexchexes (forked by SeaBee)
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==
// Original code here: https://www.reddit.com/r/ChatGPT/comments/15nbpaa/chatgpts_webinterface_width_fix/

(function() {
	const accentColor = `#141414`;

	const messagesCss = `
		/* Message body width */
		@media (min-width: 1280px) {
			.xl\\:max-w-3xl {
				max-width: 90% !important;
			}
		}
		@media (min-width: 1024px) {
			.lg\\:max-w-\\[38rem\\] {
				max-width: 90% !important;
			}
		}
		@media (min-width: 768px) {
			.md\\:max-w-2xl {
				max-width: 90% !important;
			}
			.md\\:max-w-3xl {
				max-width: 90% !important;
			}
		}

		/* Code blocks font */
		code, pre {
			font-family: Consolas,Söhne Mono,Monaco,Andale Mono,Ubuntu Mono,monospace!important;
			/* font-family: Iosevka Custom, Söhne Mono,Monaco,Andale Mono,Ubuntu Mono,monospace!important; */
			/* font-size: 12px !important; */
		}

		/* Code blocks background color */
		pre .bg-black {
			background-color: #171a21;
		}

		/* Code blocks headings background color */
		div.flex.items-center.relative.text-gray-200.bg-gray-800.gizmo\\:dark\\:bg-token-surface-primary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md {
			background-color: #272731;
		}

		/* Bring back background destinction between bot and user messages */
		.flex.flex-col.pb-9.text-sm .w-full.text-token-text-primary[data-testid]:nth-child(odd) {
			background-color: #404251;
		}

		/* Make top useless bar non-opaque (to make more text in the chat visible) */
		div.sticky.top-0.flex.items-center.justify-between.z-10.h-14.bg-white\\/95.p-2.font-semibold.dark\\:bg-gray-800\\/90 {
			background-color: rgba(52,53,65,0);
			background-image: linear-gradient(90deg, rgba(52,53,65,.9) 0%, transparent 20%);
		}

		/* Add visibility to the GPT version number */
		.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium.hover\\:bg-gray-50.radix-state-open\\:bg-gray-50.dark\\:hover\\:bg-black\\/10.dark\\:radix-state-open\\:bg-black\\/20 span.text-token-text-secondary {
			color: ${accentColor};
		}

		/* BREAK LINES IN CODE BLOCKS */
		code.\\!whitespace-pre {
			white-space: pre-wrap !important;
		}
	`;

	const sidebar_new_width = `330px`;

	const sidebar_container_selector = `.flex-shrink-0.overflow-x-hidden[style^="width: 260px"]`;

	const sidebarCss = `
		/* Sidebar width */
		${sidebar_container_selector},
		${sidebar_container_selector} .w-\\[260px\\] {
			width: ${sidebar_new_width} !important;
		}

		/* Adjust position of the new show/hide-sidebar control button to match the new width */
		div.fixed.left-0.top-1\\/2.z-40.-translate-y-1\\/2.transition-transform.translate-x-\\[260px\\].rotate-0 {
			transform: translate(${sidebar_new_width});
		}


		/*------------------*/
		/* Sidebar elements */
		/*------------------*/

		/* History periods headings color */
		h3.h-9.pb-2.pt-3.px-3.text-xs.text-gray-500.font-medium.text-ellipsis.overflow-hidden.break-all.bg-gray-50.dark\\:bg-gray-900 {
			color: ${accentColor};
		}

		ol > li > div > a > div.relative.grow.overflow-hidden.whitespace-nowrap {
			overflow: visible;
			white-space: unset;
		}

		ol > li > div > a > div.relative.grow.overflow-hidden.whitespace-nowrap > div.absolute.to-transparent {
			background-image: none;
		}

		a.hover\\:pr-4:hover,
		a.flex.py-3.px-3.items-center.gap-3.relative.rounded-md.hover\\:bg-gray-100.dark\\:hover\\:bg-\\[\\#2A2B32\\].cursor-pointer.break-all.bg-gray-50.hover\\:pr-4.dark\\:bg-gray-900.group
		{
			padding-right: unset !important;
		}

		div.absolute.inset-y-0.right-0.w-8.z-10.bg-gradient-to-l.dark\\:from-gray-900.from-gray-50.group-hover\\:from-gray-100.dark\\:group-hover\\:from-\\[\\#2A2B32\\] {
			background: none;
		}
	`;

	const cssStyles = (messagesCss + sidebarCss).replaceAll("\t", ' ');

	// Create a new <style> element and set its content to the CSS rules
	var styleElement = document.createElement("style");
	styleElement.innerHTML = cssStyles;

	// Append the new <style> element to the <head> section of the document
	document.head.appendChild(styleElement);
})();
