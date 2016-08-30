import './index.scss';
import $ from 'jquery';
import microApp from 'micro-app';

// You can configure by `setAttribute`
microApp.setAttribute('capable', true);

// Invocation chaining is more clever and suggest to use `prop` instead of `attr`
// It will work in `Zepto` too
$(microApp).prop('status-bar-style', 'black-translucent').prop('title', 'Demo of jQuery');

// You can select the element if you like
// `jQuery` could sets many values at once
// `icon` and `splash` support multi value if type of the value is 'Array'
// `String` and `Object` are both allow in `Array` and each key-value in `Object` will be set on the tag
$('script[micro-app]').prop({
    icon : [
        {
            href : 'icon.jpg',
            sizes : '120x120',
        },
        {
            href : 'icon.jpg',
            sizes : '152x152',
        },
    ],
    splash : [
        'splash.jpg',
        {
            href : 'splash.jpg',
            media : '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
            data : 'something',
        },
    ],
});
