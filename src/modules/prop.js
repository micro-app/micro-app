import {
    // Return its value until it is not a function
    NaF,
    // Camel to Hyphen
    camel2hyphen,
} from './util';

/**
 * [Define a object with setter and getter]
 * @param  {[Sting]} propertyName [propertyName]
 * @param  {[Function]} onChange  [onChange event]
 * @return {[AnyType]}            [for chaining]
 */
exports.prop = function prop ( propertyName, onChange ) {
    // Get defaults from attribute
    let propertyObject = {};
    let attributeName = propertyObject.prop = camel2hyphen(propertyName);
    let value = this.getAttribute(attributeName);
    if (value !== null) {
        propertyObject::onChange(value, null);
    }
    // Getter/Setter
    let propertyConfig = {
        get () {
            return value;
        },
        set ( newValue ) {
            newValue = NaF(newValue);
            if (newValue !== value) {
                propertyObject::onChange(newValue, value);
            }
            return value = newValue;
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
    }
    // Record the property name which is already define
    prop[propertyName] = prop[attributeName] = true;
    return this;
};
