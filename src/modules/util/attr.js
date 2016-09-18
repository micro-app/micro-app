const { setAttribute, removeAttribute } = Element.prototype;

/**
 * [Set or remove an attribute]
 * @param  {[String]} attribute [attribute name]
 * @param  {[String]} value     [attribute value]
 * @return {[Element]}          [element]
 */
exports.attr = function ( attribute, value ) {
    if (value === null) {
        this::removeAttribute(attribute);
    } else {
        this::setAttribute(attribute, value);
    }
    return this;
};
