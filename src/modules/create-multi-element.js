import {
    // When the type of value is `function`, return its result
    NaF,
    // A shortcut to show or hide the tag
    show,
    hide,
    // A shortcut to set or remove attribute
    setAttribute,
    // A shortcut to create element
    createElement,
} from './util';

const { getAttribute } = Element.prototype;

exports.createMultiElement = function ( currentItems, previousItems, config ) {
    // A container to saved the result
    let result = [];
    let attributeName = config.attribute;

    previousItems.forEach(( element ) => {
        // Clear the element
        element::hide();
    });

    let length = currentItems.length;
    for (let i = 0; i < length; i++) {
        let value = NaF(currentItems[i]);
        if (value === null) {
            // Skip
        } else {
            // Create element and show
            let element = createElement(config.code)::show();
            if (typeof value == 'object') {
                // `attributeName` should be `undefined` defaults
                element::setAttribute(attributeName, void 0);
                for (let key in value) {
                    element::setAttribute(key, NaF(value[key]));
                }
            } else {
                element::setAttribute(attributeName, value);
            }
            // Safari can not parse the img url which is include '#'
            let originValue = element::getAttribute(attributeName);
            element::setAttribute('original-' + attributeName, originValue);
            if (originValue.indexOf('#') > -1) {
                element::setAttribute(attributeName, originValue.split('#')[0]);
            }
            // Invoke `success` when element create successfully
            config.success && config.success.call(element, originValue);
            // Save the element
            result.push(element);
        }
    }
    return result;
};
