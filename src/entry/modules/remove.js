import {
    head,
} from './variable.js';

/**
 * Remove the elemment
 * @param {Element} elem target element
 */
export default function ( elem ) {
    head.removeChild(elem);
};
