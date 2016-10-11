exports.parseUrl = function ( url ) {
    let a = doc.createElement('a');
    a.href = url;
    return a;
};
