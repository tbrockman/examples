function injectContentScript(extensionId) {
    console.log('injected content script with id: ', extensionId)

    let enabled = true;
    let port = chrome.runtime.connect(extensionId);

    port.onMessage.addListener((message) => {
        console.log('message received', message);
        if (message === 'toggle') {
            console.log('toggling');
            enabled = !enabled;
        }
    });

    let proxied = fetch;
    fetch = function (resource, options) {
        console.log('in proxied fetch handler', resource)

        if (resource.includes('/svc/shreddit/events') && enabled) {
            // assuming the request body is JSON
            let body = JSON.parse(options.body);
            // mangle the tracking data
            console.log('original body', body)
            body['info'] = mangle(body['info']);
            // stringify the body again
            console.log('mangled body', body)
            options.body = JSON.stringify(body);
        }
        return proxied(resource, options);
    }

    let strings = ['never', 'gonna', 'give', 'you', 'up', 'let', 'down', 'run', 'around', 'and', 'desert', 'make', 'cry', 'say', 'goodye', 'tell', 'lie', 'hurt']
    let ints = [0, 420, 69, 8008135, 666]

    function mangle(data) {

        if (data === null || data === undefined) {
            return data
        }

        if (Array.isArray(data)) {
            data = data.map(d => mangle(d));
        } else if (typeof data === 'object') {
            Object.keys(data).forEach(key => {
                data[key] = mangle(data[key]);
            });
        }
        else if (typeof data === 'string') {
            data = strings[Math.floor(Math.random() * strings.length)];
        } else if (typeof data === 'number') {
            data = ints[Math.floor(Math.random() * ints.length)];
        } else if (typeof data === 'boolean') {
            data = Math.random() < 0.5;
        }
        return data;
    }
}

export {
    injectContentScript
}