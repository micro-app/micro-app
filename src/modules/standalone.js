import {
    // Save or load the data
    data,
} from './util';

/**
 * [dispatch Event `redirect`]
 */
exports.standalone = function () {
    let url = data('href');
    if (url) {
        // Before redirect, dispatchEvent on `window`
        let redirectEvent = document.createEvent('CustomEvent');
        redirectEvent.initEvent('redirect', false, true);
        if (window.dispatchEvent(redirectEvent)) {
            location.replace(url);
        }
    }
};
