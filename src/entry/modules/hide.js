import { head } from './variable.js';

/**
 * Hide the elemment
 * @param {Element} elem
 */
export default function ( elem ) {
    head.removeChild(elem);
};
