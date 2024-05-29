import { injectContentScript } from './main-world-content-script.js';
import { injectRelay } from './isolated-relay-content-script.js';

// relay listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === 'isolated-world-event:relay') {
        console.log('message received in background script', message);
    }
});

// inject content script into all tabs
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete') {
        chrome.scripting.executeScript({
            target: { tabId, allFrames: true },
            func: injectRelay,
            args: [],
            injectImmediately: true,
            world: 'ISOLATED'
        }).then(() => {
            console.log('relay script injected');
        })

        chrome.scripting.executeScript({
            target: { tabId, allFrames: true },
            func: injectContentScript,
            args: [],
            injectImmediately: true,
            world: 'MAIN'
        }).then(() => {
            console.log('content script injected');
        });
    }
});