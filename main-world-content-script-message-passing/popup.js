document.addEventListener('DOMContentLoaded', function () {
    let toggle = document.getElementById('toggle');
    toggle.addEventListener('click', async () => {
        await chrome.runtime.sendMessage('toggle')
    });
});