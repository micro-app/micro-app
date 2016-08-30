exports.parseFilter = function ( expression ) {
    return expression ? expression.substring(1).split('|') : [];
};
