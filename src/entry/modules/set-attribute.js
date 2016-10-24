const { setAttribute, removeAttribute } = Element.prototype;

/**
 * [description]
 * @param  {Element} elem
 * @param  {String} attribute
 * @param  {AnyType} value
 */
export default function ( elem, attribute, value ) {
    if (value === null) {
        removeAttribute.call(elem, attribute);
    } else {
        setAttribute.call(elem, attribute, value);
    }
};
