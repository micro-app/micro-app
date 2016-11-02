import microApp from './namespace.js';
import defineProperty from './define-property.js';

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
            defineProperty(
                function () {
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
                },
                'name',
                name
            ),
            'toString',
            function toString () { return `function ${ name }() { [native code] }` }
        )
    );
};
