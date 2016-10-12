/**
 * [Camel case to hyphen case]
 * @param  {[String]} string [camel case]
 * @return {[String]}        [hyphen case]
 */
exports.camel2hyphen = function ( string ) {
    return string.replace(/[A-Z]/g, function ( match ) {
        return '-' + match.toLowerCase();
    });
};
