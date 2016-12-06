import {
    define,
} from './modules/variable.js';
import {
    ios,
    safari,
} from './modules/user-agent.js';
import append from './modules/append.js';
import filter from './modules/filter.js';
import remove from './modules/remove.js';
import autosize from './modules/autosize.js';
import override from './modules/override.js';
import microApp from './modules/namespace.js';
import setAttribute from './modules/set-attribute.js';
import createElement from './modules/create-element.js';
import defineProperty from './modules/define-property.js';
import defineAttribute from './modules/define-attribute.js';
import createMultiElement from './modules/create-multi-element.js';

// Version
defineProperty(microApp, 'version', process.env.VERSION);

// Define a filter by `microApp.filter`
defineProperty(microApp, 'filter', filter);

if (ios && safari) {

    // A filter of `precomposed`
    microApp.filter('precomposed', function () {
        this.rel = 'apple-touch-icon-precomposed';
    })

    // A filter of `autosize`
    .filter('autosize', function () {
        let type = this.getAttribute('rel') == 'apple-touch-startup-image' ? 'splash' : 'icon';
        let attributes = autosize(type);
        if (attributes) {
            for (let attributeName in attributes) {
                this.setAttribute(attributeName, attributes[attributeName]);
            }
        }
    });

    // Capable, `null` equates disable, others will change to enable
    let capable = createElement('<meta name="apple-mobile-web-app-capable" content="yes">');
    defineAttribute('capable', function ( name, value, previous ) {
        setAttribute(microApp, name, value);
        if (value === null) {
            remove(capable);
        }
        if (previous === null) {
            append(capable);
        }
    });

    // StatusBarStyle, normally, the value is one of `black-translucent`,`black`,`white`
    let statusBarStyle = createElement('<meta name="apple-mobile-web-app-status-bar-style">');
    defineAttribute(['statusBarStyle', 'status-bar-style'], function ( name, value, previous ) {
        setAttribute(microApp, name, value);
        setAttribute(statusBarStyle, 'content', value);
        if (value === null) {
            remove(statusBarStyle);
        }
        if (previous === null) {
            append(statusBarStyle);
        }
    });

    // Title, the app's name
    let title = createElement('<meta name="apple-mobile-web-app-title">');
    defineAttribute('title', function ( name, value, previous ) {
        setAttribute(microApp, name, value);
        setAttribute(title, 'content', value);
        if (value === null) {
            remove(title);
        }
        if (previous === null) {
            append(title);
        }
    });

    // Icon, the cover of app
    defineAttribute('icon', createMultiElement('<link rel="apple-touch-icon">', 'href'));

    // Splash, the start up image
    defineAttribute('splash', createMultiElement('<link rel="apple-touch-startup-image">', 'href'));

    // Override the method `getAttribute`
    override('getAttribute', function ( event, args ) {
        let name = args[0];
        if (microApp === this && name in defineAttribute) {
            // This attribute is defined
            event.stopPropagation();
            return microApp[name];
        }
    });

    // Override the method `setAttribute`
    override('setAttribute', function ( event, args ) {
        let name = args[0];
        let value = args[1];
        if (microApp === this && name in defineAttribute) {
            // This attribute is defined
            event.stopPropagation();
            return microApp[name] = value;
        }
    });

    // Override the method `removeAttribute`
    override('removeAttribute', function ( event, args ) {
        let name = args[0];
        if (microApp === this && name in defineAttribute) {
            // This attribute is defined
            event.stopPropagation();
            return microApp[name] = null;
        }
    });

}

module.exports = window.microApp = microApp;

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
