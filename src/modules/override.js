import {
    // Define static property
    define,
} from './util';

exports.override = function ( name, handler ) {
    let method = this[name];
    if (typeof method == 'function') {
        // `function` will be overrided
        this::define(
            name,
            function () {
                // `bubbles` as a flag
                let bubbles = true;
                let result = this::handler(
                    {
                        stopPropagation () {
                            bubbles = false;
                        },
                    },
                    arguments
                );
                // Interrupt the function chain by `event.stopPropagation` and give the `result` as return value
                return bubbles ? method.apply(this, arguments) : result;
            }
        );
    }
    return this;
};
