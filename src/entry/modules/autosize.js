import {
    os,
    mobile,
} from './user-agent.js';

const icon = [
    // pad
    [
        // os <= 6
        [
            // low dpi
            '72x72',
            // high dpi
            '144x144',
        ],
        // os >= 7
        [
            // low dpi
            '76x76',
            // high dpi
            '152x152',
        ],
    ],
    // phone or pod
    [
        // os <= 6
        [
            // low dpi
            '57x57',
            // high dpi
            '114x114',
        ],
        // os >= 7
        [
            // low dpi
            '60x60',
            // high dpi
            '120x120',
        ],
    ],
];

let splash = {};
const width = 'device-width';
const height = 'device-height';
if (mobile) {
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
    ].forEach(( type ) => {
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

/**
 * Get the autosize config
 * @param  {String} type icon/splash
 * @return {Object} config config
 */
export default function ( type ) {
    if (type == 'icon') {
        let sizes = icon[+mobile][+(os > 6)][+(devicePixelRatio > 1)];
        return { sizes };
    }
    if (type == 'splash') {
        let result = [];
        for (let rule in splash) {
            result.push(`(${ rule }:${ splash[rule] })`);
        }
        if (!mobile || devicePixelRatio == 3) {
            let rule = '(orientation:landscape)';
            if (matchMedia(rule).matches) {
                result.push(rule);
            } else {
                result.push('(orientation:portrait)');
            }
        }
        let media = result.join('and');
        return { media };
    }
};
