exports.camel2hyphen = function ( string ) {
    return string.replace(/[A-Z]/g, function ( match ) {
        return '-' + match.toLowerCase();
    });
};
