/**
 * [Return its value until it is not a function]
 * @param {[AnyType]} value [value]
 */
exports.NaF = function ( value ) {
    return typeof value == 'function' ? NaF(value()) : value;
};
