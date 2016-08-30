const { setAttribute, removeAttribute } = Element.prototype;

exports.setAttribute = function ( attribute, value ) {
    if (value === null) {
        this::removeAttribute(attribute);
    } else {
        this::setAttribute(attribute, value);
    }
    return this;
};
