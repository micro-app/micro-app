const userAgent = navigator.userAgent;

exports.userAgent = {
    is : {
        ios : /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(userAgent),
        safari : /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(userAgent),
    },
    device : /iPad/i.test(userAgent) ? 'pad' : 'phone',
    os : parseInt((userAgent.match(/\bcpu(?: iphone)? os /i.test(userAgent) ? /\bcpu(?: iphone)? os ([0-9._]+)/i : /\biph os ([0-9_]+)/i) || [,0])[1]) > 6 ? 7 : 6,
};
