import microApp from './namespace.js';
import defineProperty from './define-property.js';

const supportConfigurable = Object.getOwnPropertyDescriptor(() => {}, 'name').configurable;

/**
 * Override a function on microApp
 * @param  {String} name function name
 * @param  {Function} handler function body
 */
export default function ( name, handler ) {
    let method = microApp[name];
    // Reset the method name
    defineProperty(
        microApp,
        name,
        defineProperty(
            (() => {
                let anonymous = function () {
                    // `bubbles` as a flag
                    let bubbles = true;
                    let result = handler.call(
                        this,
                        {
                            stopPropagation () {
                                bubbles = false;
                            },
                        },
                        arguments
                    );
                    // Interrupt the function chain by `event.stopPropagation` and give the `result` as return value
                    return bubbles ? method.apply(this, arguments) : result;
                };
                if (supportConfigurable) {
                    return defineProperty(
                        anonymous,
                        'name',
                        name
                    );
                } else {
                    return anonymous;
                }
            })(),
            'toString',
            function toString () { return `function ${ name }() { [native code] }` }
        )
    );
};
