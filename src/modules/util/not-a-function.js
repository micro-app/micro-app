exports.NaF = function ( value ) {
    return typeof value == 'function' ? NaF(value()) : value;
};
