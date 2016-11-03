let data = {};

if (location.hash) {
    let hash = decodeURIComponent(location.hash.substring(1));
    hash.split('&').forEach(( keyValue ) => {
        let temp = keyValue.split('=');
        let key = temp[0];
        let value = temp[1];
        if (value === void 0) {
            value = '';
        }
        data[key] = value;
    });
}

function update () {
    let result = [];
    for (let key in data) {
        let value = data[key];
        if (value !== null) {
            result.push(key + '=' + value);
        }
    }
    location.hash = encodeURIComponent(result.join('&'));
}

/**
 * Get or set data from hash
 * @param  {String} key data key
 * @param  {String} value data value
 * @return {String_String_Object} data_value_this data/value/this
 */
export default function ( key, value ) {
    if (key === void 0) {
        return data;
    }
    if (value === void 0) {
        return data[key];
    }
    data[key] = value;
    update();
    return value;
};
