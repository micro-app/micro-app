/**
 * [Define static property]
 * @param  {[String]} name   [property name]
 * @param  {[AnyType]} value [property value]
 * @return {[Object]}        [object]
 */
exports.define = function ( name, value ) {
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
