const container = doc.createElement('div');

/**
 * [Create an element from html code]
 * @param  {[String]} html [html code]
 * @return {[Element]}     [element]
 */
exports.create = function ( html ) {
    container.innerHTML = html;
    return container.firstElementChild;
};
