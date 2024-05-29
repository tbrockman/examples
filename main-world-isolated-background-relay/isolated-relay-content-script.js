export const injectRelay = () => {
    // listen for messages from the main world
    window.addEventListener('main-world-event:relay', event => {
        // send the message to the background script
        console.log('main world event received in isolated world relay', event);
        chrome.runtime.sendMessage({
            type: 'isolated-world-event:relay',
            ...event
        });
    });
}