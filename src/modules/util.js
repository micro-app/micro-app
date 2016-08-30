//---------- ./_variable.js ----------
const doc = document;
const head = doc.head;
//---------- ./camel2hyphen.js ----------
exports.camel2hyphen = function ( string ) {
    return string.replace(/[A-Z]/g, function ( match ) {
        return '-' + match.toLowerCase();
    });
};
//---------- ./compatible.js ----------
exports.compatible = function ( microApp ) {
    [
        'hash',
        'filter',
    ].forEach(( methodName ) => {
        microApp[methodName] = function () {
            console.warn(`micro-app: "${ methodName }" is an empty function.`);
            return this;
        };
    });
};
//---------- ./create-element.js ----------
const container = doc.createElement('div');

exports.createElement = function ( html ) {
    container.innerHTML = html;
    return container.firstElementChild;
};
//---------- ./define-static-property.js ----------
exports.defineStaticProperty = function ( name, value ) {
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
//---------- ./hash-listener.js ----------
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
//---------- ./hash.js ----------
let hashStorage = {};

if (location.hash) {
    let hash = decodeURIComponent(location.hash.substring(1));
    hash.split('&').forEach(( keyValue ) => {
        let temp = keyValue.split('=');
        let key = temp[0];
        let value = temp[1];
        if (value === void 0) {
            value = '';
        }
        hashStorage[key] = value;
    });
}

function update () {
    let result = [];
    for (let key in hashStorage) {
        let value = hashStorage[key];
        if (value !== null) {
            result.push(key + '=' + value);
        }
    }
    location.hash = encodeURIComponent(result.join('&'));
}

exports.hash = function ( key, value ) {
    if (key === void 0) {
        return hashStorage;
    }
    if (value === void 0) {
        return hashStorage[key];
    }
    hashStorage[key] = value;
    update();
    return this;
};
//---------- ./hide.js ----------
exports.hide = function () {
    head.removeChild(this);
    return this;
};
//---------- ./not-a-function.js ----------
exports.NaF = function ( value ) {
    return typeof value == 'function' ? NaF(value()) : value;
};
//---------- ./parse-argument.js ----------
exports.parseArgument = function ( expression ) {
    let left = /\(/.test(expression);
    let right = /\)/.test(expression);
    if (left || right) {
        try {
            if (!left) {
                throw new SyntaxError('[micro-app] Missing "(" before argument list.');
            }
            if (!right) {
                throw new SyntaxError('[micro-app] Missing ")" after argument list.');
            }
            if (!/\)$/.test(expression)) {
                throw new SyntaxError(`[micro-app] Unexpected end of "${ expression.match(/.*(\).*$)/)[1] }".`);
            }
            let temp = expression.match(/(.*?)\((.*)\)$/);
            let methodName = temp[1];
            let methodArgument = temp[2];
            return [methodName, JSON.parse(`[${ methodArgument }]`)];
        } catch (e) {
            // Function will be stoped cause throw an error sync
            setTimeout(() => {
                throw e;
            }, 0);
            return [''];
        }
    } else {
        return [expression, []];
    }
};
//---------- ./parse-filter.js ----------
exports.parseFilter = function ( expression ) {
    return expression ? expression.substring(1).split('|') : [];
};
//---------- ./parse-url.js ----------
exports.parseUrl = function ( url ) {
    let a = doc.createElement('a');
    a.href = url;
    return a;
};
//---------- ./set-attribute.js ----------
const { setAttribute, removeAttribute } = Element.prototype;

exports.setAttribute = function ( attribute, value ) {
    if (value === null) {
        this::removeAttribute(attribute);
    } else {
        this::setAttribute(attribute, value);
    }
    return this;
};
//---------- ./show.js ----------
exports.show = function () {
    head.appendChild(this);
    return this;
};
//---------- ./user-agent.js ----------
const userAgent = navigator.userAgent;

exports.userAgent = {
    is : {
        ios : /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(userAgent),
        safari : /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent),
    },
    device : /iPad/i.test(userAgent) ? 'pad' : 'phone',
    os : parseInt((userAgent.match(/\bcpu(?: iphone)? os /i.test(userAgent) ? /\bcpu(?: iphone)? os ([0-9._]+)/i : /\biph os ([0-9_]+)/i) || [,0])[1]) > 6 ? 7 : 6,
};
