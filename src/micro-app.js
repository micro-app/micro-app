let { userAgent } = require('./modules/util');

// Namespace
let microApp = document.querySelector('script[micro-app]');
if (!microApp) {
    // Create micro-app element
    let {
        show,
        createElement,
    } = require('./modules/util');
    microApp = createElement('<script micro-app>')::show();
}

if (userAgent.is.ios) {
    // Detect the browser
    if (userAgent.is.safari) {
        // It looks like in Safari
        require('./modules/main').main(microApp);
    } else if (navigator.standalone) {
        // That means website running in web-app
        require('./modules/standalone').standalone(microApp);
    } else {
        // Open in other browser
        require('./modules/util').compatible(microApp);
    }
} else {
    require('./modules/util').compatible(microApp);
}

module.exports = microApp;

// add to home screen 的缓存(app-store)

// 体验优化
// 1. 用户安装时触发的事件
// 2. 增加删除描述文案
// 3. 提供原生交互
// 3.1 应用的3Dtouch快捷方式
// 3.2 消息推送
// 3.3 应用进入后台事件(Home键)
// 3.4 应用返回前台事件
// 4. 无法解决icon等信息的动态修改与缓存
