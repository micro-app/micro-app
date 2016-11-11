const {
    setAttribute,
    removeAttribute,
} = Element.prototype;

/**
 * Set or remove an attribute
 * @param {Element} elem target element
 * @param {String} attribute attribute name
 * @param {AnyType} value attribute value
 */
export default function ( elem, attribute, value ) {
    if (value === null) {
        removeAttribute.call(elem, attribute);
    } else {
        setAttribute.call(elem, attribute, value);
    }
};
