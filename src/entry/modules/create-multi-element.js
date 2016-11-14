import append from './append.js';
import filter from './filter.js';
import remove from './remove.js';
import microApp from './namespace.js';
import setAttribute from './set-attribute.js';
import createElement from './create-element.js';

const defaultArrayValue = ({}).toString.call([]);
const defaultBase64Value = '[object Base64]';

/**
 * Create multiple elements
 * @param  {String} code html code
 * @param  {String} attributeName an default attribute name
 * @return {Function} func onChange of `defineAttribute`
 */
export default function ( code, attributeName ) {
    // Previous items
    let previousItems = [];

    // onChange
    return function ( name, value, previous ) {
        // Format to `Array`
        let currentItems = (value instanceof Array) ? value.slice(0) : value === null ? [] : [value];

        // Clear old elements
        previousItems.forEach(( element ) => {
            remove(element);
        });
        previousItems = [];

        // Create new elements
        let length = currentItems.length;
        for (let i = 0; i < length; i++) {
            let value = currentItems[i];
            if (value !== null) {
                // Create element
                let element = createElement(code);
                if (value instanceof Object) {
                    // `attributeName` should be `undefined` defaults
                    setAttribute(element, attributeName, void 0);
                    for (let key in value) {
                        setAttribute(element, key, value[key]);
                    }
                } else {
                    setAttribute(element, attributeName, value);
                }
                // Safari can not parse the img url includes '#'
                let attributeValue = element.getAttribute(attributeName);
                if (attributeValue.indexOf('#') > -1) {
                    let temp = attributeValue.split('#');
                    setAttribute(element, attributeName, temp[0]);
                    setAttribute(element, 'filter', temp[1]);
                    let interrupt = false;
                    temp[1].split('|').forEach(( filterName ) => {
                        if (interrupt) {
                            return;
                        }
                        let filterMethod = filter[filterName];
                        if (filterMethod) {
                            interrupt = filterMethod.call(element) === false;
                        }
                    });
                }
                // Save the element
                previousItems.push(append(element));
            }
        }

        // Set value as attribute
        setAttribute(microApp, name, value instanceof Array ? defaultArrayValue : /^data:image/.test(value) ? defaultBase64Value : value);
    };
};
