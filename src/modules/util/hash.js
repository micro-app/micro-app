let hashStorage = {};

if (location.hash) {
    let hash = decodeURIComponent(location.hash.substring(1));
    hash.split('&').forEach(( expression ) => {
        let keyValue = expression.split('=');
        let key = keyValue[0];
        let value = keyValue[1];
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
