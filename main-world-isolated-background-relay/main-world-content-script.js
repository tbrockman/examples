export const injectContentScript = () => {

    let i = 0;

    setInterval(() => {
        const event = new CustomEvent('main-world-event:relay', { detail: i });
        console.log('sending event to be relayed to background script', event)
        window.dispatchEvent(event);
        i++;
    }, 5000)
}
