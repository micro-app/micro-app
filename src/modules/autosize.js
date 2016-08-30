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
        {
            width : 320,
            height : 568,
        },
        {
            width : 375,
            height : 667,
        },
        {
            width : 414,
            height : 736,
        },
    ].forEach(function ( type ) {
        if (matchMedia(`(${ width }:${ type.width }px)and(${ height }:${ type.height }px)`).matches) {
            splash[width] = type.width;
            splash[height] = type.height;
        }
    });
    splash[width] += 'px';
    splash[height] += 'px';
} else {
    splash[width] = '768px';
    splash[height] = '1024px';
}
splash['-webkit-device-pixel-ratio'] = devicePixelRatio;

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
