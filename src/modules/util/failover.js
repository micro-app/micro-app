exports.failover = function ( microApp ) {
    [
        'hash',
        'filter',
    ].forEach(( methodName ) => {
        microApp[methodName] = function () {
            warn(`"${ methodName }" is invalid in this browser.`);
            return this;
        };
    });
};
