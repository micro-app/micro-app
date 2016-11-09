import {
    userAgent,
} from './variable.js';

/**
 * The platform is ios or not
 * @type {Boolean} ios
 */
export const ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(userAgent);

/**
 * The device is mobile(iPhone and iPod) or not
 * @type {Boolean} mobile
 */
export const mobile = !/iPad/i.test(userAgent);

/**
 * The browser is safari or not
 * @type {Boolean} safari
 */
export const safari = /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent);

/**
 * Standalone mode or not
 * @type {Boolean} standalone
 */
export const standalone = !!navigator.standalone;

/**
 * The major version of os
 * @type {Number} os
 */
export const os = parseInt((userAgent.match(/\bcpu(?: iphone)? os /i.test(userAgent) ? /\bcpu(?: iphone)? os ([0-9._]+)/i : /\biph os ([0-9_]+)/i) || [,0])[1]);
