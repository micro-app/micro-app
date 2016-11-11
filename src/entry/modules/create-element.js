import {
    doc,
} from './variable.js';

const container = doc.createElement('div');

/**
 * Create an element
 * @param  {String} html html code
 * @return {Element} elem result element
 */
export default function ( html ) {
    container.innerHTML = html;
    return container.firstElementChild;
};
