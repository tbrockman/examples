# main-world-isolated-background-relay

> [!TIP]
> This shows a cross-platform way (as it does not require `externally_connectable` which is not available in Firefox) to communicate between a background script and a `MAIN` world content script which was injected using `chrome.scripting.executeScript`.

We inject two scripts, one into the `MAIN` world and one into the `ISOLATED` world. The `MAIN` world script generates custom events which the `ISOLATED` world script listens for. The `ISOLATED` world script then sends a message to the background script.

If desired, communication could also go the other direction through the same mechanism in reverse.

## Running the example

No building or bundling required, just load the extension as an unpacked extension in Chrome (or whatever browser which supports the used APIs).

