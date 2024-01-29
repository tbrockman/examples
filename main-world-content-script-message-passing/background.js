import { injectContentScript } from './content-script.js';

// keep track of all our connections for messaging
let ports = [];

// listen for external connections from content scripts
chrome.runtime.onConnectExternal.addListener((port) => {
    console.log('external connection received', port);
    ports.push(port);
});

// listen for messages from popup, and relay to content scripts
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        ports.forEach(port => {
            port.postMessage(request);
        });
    }
);

// inject content script into all tabs
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete') {
        chrome.scripting.executeScript({
            target: { tabId, allFrames: true },
            func: injectContentScript,
            args: [chrome.runtime.id],
            injectImmediately: true,
            world: 'MAIN'
        }).then(() => {
            console.log('content script injected');
        });
    }
});