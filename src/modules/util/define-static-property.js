exports.defineStaticProperty = function ( name, value ) {
    Object.defineProperty(
        this,
        name,
        {
            value,
            writable : false,
            enumerable : false,
            configurable : false,
        }
    );
    return this;
};
