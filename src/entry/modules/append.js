import {
    head,
} from './variable.js';

/**
 * Append the elemment
 * @param {Element} elem target element
 * @return {Element} elem target element
 */
export default function ( elem ) {
    head.appendChild(elem);
    return elem;
};
