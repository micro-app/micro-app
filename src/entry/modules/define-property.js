import {
    define,
} from './variable.js';

/**
 * Define static property
 * @param {Object} target target object
 * @param {String} name property name
 * @param {AnyType} value property value
 */
export default function ( target, name, value ) {
    return define(
        target,
        name,
        {
            value,
            writable : false,
            enumerable : false,
            configurable : false,
        }
    );
};
