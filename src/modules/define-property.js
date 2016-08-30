import {
    // When the type of value is `function`, return its result
    NaF,
} from './util';

exports.defineProperty = function defineProperty ( propertyObject ) {
    // Get defaults from attribute
    let propertyName = propertyObject.name;
    let attributeName = propertyObject.hyphenName || propertyName;
    let value;
    if (propertyObject.value === void 0) {
        value = propertyObject.value = this.getAttribute(attributeName);
    } else {
        this.setAttribute(attributeName, value = propertyObject.value);
    }
    if (value !== null) {
        propertyObject.onChange(value, null);
    }
    // Getter/Setter
    let propertyConfig = {
        get () {
            return propertyObject.value
        },
        set (value) {
            // exclude the value which is type of `function`
            value = NaF(value);
            if (value !== propertyObject.value) {
                // the value is diffrent from old value
                propertyObject.onChange(value, propertyObject.value);
            }
            return propertyObject.value = value;
        },
        enumerable : false,
    };
    Object.defineProperty(
        this,
        propertyName,
        propertyConfig
    );
    // Both define camel and hyphen
    if (propertyName != attributeName) {
        Object.defineProperty(
            this,
            attributeName,
            propertyConfig
        );
        // Mark down the property name
        defineProperty[propertyName] = defineProperty[attributeName] = true;
        return this;
    }
    // Mark down the property name
    defineProperty[propertyName] = true;
    return this;
};
