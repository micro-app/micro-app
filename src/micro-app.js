// let { userAgent } = require('./modules/util');

// Namespace
// let microApp = document.querySelector('script[micro-app]');
// if (!microApp) {
//     // Create micro-app element
//     let {
//         show,
//         createElement,
//     } = require('./modules/util');
//     microApp = createElement('<script micro-app>')::show();
// }

// if (userAgent.is.ios) {
//     // Detect the browser
//     if (userAgent.is.safari) {
//         // It looks like in Safari
//         require('./modules/main').main(microApp);
//     } else if (navigator.standalone) {
//         // That means website running in web-app
//         require('./modules/standalone').standalone(microApp);
//     } else {
//         // Open in other browser
//         require('./modules/util').failover(microApp);
//     }
// } else {
//     require('./modules/util').failover(microApp);
// }
microApp = [0,1];
console.log(1);
module.exports = microApp;

// 尚存问题
// 1. 点击分享按钮后 Safari会检索页面对应meta标签并且写入变量存储 无论点击分享按钮多少次以及后续操作包括添加到桌面 都不会重新修改变量 导致icon无法动态修改
// 2. 添加bookmark或者favorite后 点击分享按钮 应用icon会根据 添加到bookmark时为准 而不会去检索页面的meta标签

// 体验优化
// 1. 用户安装时触发的事件
// 2. 增加删除描述文案
// 3. 提供原生交互
// 3.1 应用的3Dtouch快捷方式
// 3.2 消息推送
// 3.3 应用进入后台事件(Home键)
// 3.4 应用返回前台事件
// 4. 无法解决应用icon等信息的动态修改与缓存
