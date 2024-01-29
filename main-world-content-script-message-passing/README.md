# main-world-content-script-message-passing

> [!WARNING]
> Only verified to work in Chrome, Firefox does not offer a `MAIN` world.

[See the original blog post](#TODO).

This is a sample extension that demonstrates how to communicate between a [background script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) and a [`MAIN`](https://developer.chrome.com/docs/extensions/reference/api/scripting#type-ExecutionWorld) world content script (as well as using `func` and `args` with [`chrome.scripting.executeScript`](https://developer.chrome.com/docs/extensions/reference/api/scripting#method-executeScript)).

No building or bundling required, just load the extension as an unpacked extension in Chrome.

