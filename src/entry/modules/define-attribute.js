import {
    define,
} from './variable.js';
import microApp from './namespace.js';

/**
 * Define property and listen change of value on microApp
 * @param  {String_Array} name String or Array like [property name, attribute name]
 * @param  {Function} onChange callback
 */
export default function defineAttribute ( name, onChange ) {
    // propertyName should be camel case, attributeName should be hyphen case
    let propertyName;
    let attributeName;
    if (typeof name == 'string') {
        propertyName = attributeName = name;
    } else {
        propertyName = name[0];
        attributeName = name[1];
    }
    // Get defaults from attribute
    let value = microApp.getAttribute(attributeName);
    if (value !== null) {
        onChange(attributeName, value, null);
    }
    // Getter, setter
    let propertyConfig = {
        get () {
            return value
        },
        set ( newValue ) {
            if (newValue !== value) {
                // the value is diffrent from old value
                onChange(attributeName, newValue, value);
            }
            return value = newValue;
        },
        enumerable : false,
    };
    define(
        microApp,
        propertyName,
        propertyConfig
    );
    // Mark down the property name
    defineAttribute[propertyName] = true;
    // Both define camel and hyphen
    if (propertyName != attributeName) {
        define(
            microApp,
            attributeName,
            propertyConfig
        );
        // Mark down the property name
        defineAttribute[attributeName] = true;
    }
};
