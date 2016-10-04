let storage = {};

// if (location.hash) {
//     let hash = decodeURIComponent(location.hash.substring(1));
//     hash.split('&').forEach(( expression ) => {
//         let keyValue = expression.split('=');
//         let key = keyValue[0];
//         let value = keyValue[1];
//         if (value === void 0) {
//             value = '';
//         }
//         hashStorage[key] = value;
//     });
// }
//
// function update () {
//     let result = [];
//     for (let key in hashStorage) {
//         let value = hashStorage[key];
//         if (value !== null) {
//             result.push(key + '=' + value);
//         }
//     }
//     location.hash = encodeURIComponent(result.join('&'));
// }

/**
 * [Save or load the data]
 * @param  {[String]} key   [data name]
 * @param  {[String]} value [data value]
 * @return {[AnyType]}      [for chaining]
 */
exports.data = function ( key, value ) {
    if (key === void 0) {
        return storage;
    }
    if (value === void 0) {
        return storage[key];
    }
    storage[key] = value;
    update();
    return this;
};
