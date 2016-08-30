exports.hashListener = function ( keys ) {

    let expression = new RegExp(`(^|&)(${ keys.join('|') })${ encodeURIComponent('=') }`);

    function check ( url ) {
        let position = url.indexOf('#');
        if (position > -1 && position < url.length - 1) {
            let content = url.substring(position + 1);
            if (!expression.test(content)) {
                console.warn('micro-app: "location.hash" is in use to save the params.');
            }
        }
    };

    window.addEventListener('hashchange', ( event ) => {
        check(event.newURL);
    });

    // Check at once when website onload
    {
        check(location.href);
    }
};
