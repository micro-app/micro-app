/**
 * [Like a fallback]
 * @param  {[Object]} microApp [microApp]
 */
exports.failover = function ( microApp ) {
    [
        'data',
        'filter',
    ].forEach(( methodName ) => {
        microApp[methodName] = function () {
            console.warn(`micro-app: "${ methodName }" is invalid in this browser.`);
            return this;
        };
    });
};
