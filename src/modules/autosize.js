import {
    userAgent,
} from './util';

const { device, os } = userAgent;
const hdpi = devicePixelRatio > 1 ? 1 : 0;

const icon = {
    phone : {
        6 : {
            0 : '57x57',
            1 : '114x114',
        },
        7 : {
            0 : '60x60',
            1 : '120x120',
        },
    },
    pad : {
        6 : {
            0 : '72x72',
            1 : '144x144',
        },
        7 : {
            0 : '76x76',
            1 : '152x152',
        },
    },
};

let splash = {};
const width = 'device-width';
const height = 'device-height';
if (device == 'phone') {
    splash[width] = 320;
    splash[height] = 480;
    [
        [320, 568],
        [375, 667],
        [414, 736],
    ].forEach(function ( size ) {
        if (matchMedia(`(${ width }:${ size[0] }px)and(${ height }:${ size[1] }px)`).matches) {
            splash[width] = size[0];
            splash[height] = size[1];
        }
    });
} else {
    splash[width] = 768;
    splash[height] = 1024;
}
splash[width] += 'px';
splash[height] += 'px';
splash['-webkit-device-pixel-ratio'] = devicePixelRatio;

/**
 * [Auto computed the app icon or splash size of this device]
 * @param  {[String]} type [icon or splash]
 * @return {[Object]}      [result of autosize]
 */
exports.autosize = function ( type ) {
    if (type == 'icon') {
        let sizes = icon[device][os][hdpi];
        return { sizes };
    }
    if (type == 'splash') {
        let result = [];
        for (let rule in splash) {
            result.push(`(${ rule }:${ splash[rule] })`);
        }
        if (device == 'pad' || devicePixelRatio == 3) {
            if (matchMedia('(orientation:landscape)').matches) {
                result.push('(orientation:landscape)');
            } else {
                result.push('(orientation:portrait)');
            }
        }
        let media = result.join('and');
        return { media };
    }
};
