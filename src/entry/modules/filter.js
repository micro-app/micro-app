/**
 * Define filter
 * @param  {String} name filter name
 * @param  {Function} method filter method
 * @return {Object} this this
 */
export default function filter ( name, method ) {
    if (typeof name != 'string' || typeof method != 'function') {
        throw new TypeError(`[micro-app] microApp.filter( name : String, method : Function );`);
    }
    // let character = name.match(/[\||\(|\)]/);
    let character = name.match(/\|/);
    if (character) {
        throw new TypeError(`[micro-app] "${ character[0] }" is not allowed.`);
    }
    filter[name] = method;
    return this;
}
