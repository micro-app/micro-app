[![npm](https://img.shields.io/npm/l/micro-app.svg?style=flat-square)](https://www.npmjs.org/package/micro-app)
[![npm](https://img.shields.io/npm/v/micro-app.svg?style=flat-square)](https://www.npmjs.org/package/micro-app)
[![npm](https://img.shields.io/npm/dm/micro-app.svg?style=flat-square)](https://www.npmjs.org/package/micro-app)
[![Travis CI](https://img.shields.io/travis/micro-app/micro-app.svg?style=flat-square)](https://travis-ci.org/micro-app/mmicro-app)

# micro-app
> (<5kb) [📱iOS] Create Progressive Web App Dynamically.

## Try it now

* Open [https://micro-app.github.io/](https://micro-app.github.io/) in Safari.

## Getting started
```
$ npm install micro-app
```

## Demo
```
$ npm cd node_modules/micro-app/
$ npm install
$ npm run demo
```

## How to use

##### 1. Declare feature on the script tag which has an attribute `"micro-app"`.

```html
<script micro-app src="micro-app.min.js" capable></script>
```

##### 2. Select the script tag which has an attribute `"micro-app"` then set feature by `"setAttribute"`.

```html
<script micro-app src="micro-app.min.js"></script>
<script>
    document.querySelector('script[micro-app]').setAttribute('capable', true);
</script>
```

##### 3. Assign feature on the global namespace `"microApp"`.

```html
<script src="micro-app.min.js"></script>
<script>
    microApp.capable = true;
</script>
```

## Features

* If you assign a `null`, that means remove the feature.

#### #capable

* `microApp.capable = true`;

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

#### #status-bar-style

* `microApp.statusBarStyle = 'black-translucent'`;
* Both `microApp["status-bar-style"]` and `microApp.statusBarStyle` are same.

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

#### #title

* `microApp.title = 'title'`;

```html
<meta name="apple-mobile-web-app-title" content="title">
```

#### #icon

* `microApp.icon = 'icon.jpg'`;
* Support multiple.

```html
<link rel="apple-touch-icon" href="icon.jpg">
```

#### #splash

* `microApp.icon = 'splash.jpg'`;
* Support multiple.

```html
<link rel="apple-touch-startup-image" href="splash.jpg">
```

## Multiple

Use `Array` and `Object` to set multiple `icon` and `splash`.
[@see /demo/jquery/entry/index.js](https://github.com/lixinliang/micro-app/blob/master/demo/jquery/entry/index.js#L16)

## Methods

#### #filter
> microApp.filter( filterName : String, filterHandler : Function ) => microApp : microApp

* Define a filter, filter the url about icon and splash.

## Filters

#### #precomposed
* Set the attribute `rel="apple-touch-icon-precomposed"`.

#### #autosize
* Set `sizes` or `media` after computed.

## License

MIT
