const container = doc.createElement('div');

exports.createElement = function ( html ) {
    container.innerHTML = html;
    return container.firstElementChild;
};
