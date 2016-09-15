# micro-app
> [📱iOS] Create Web App Dynamic!! (9k)

## Try it now

* Open [https://micro-app.github.io/](https://micro-app.github.io/) in Safari.

## Getting started
```
$ npm install micro-app
```

## Demo
```
$ npm cd node_modules
$ npm cd micro-app
$ npm install
$ npm run demo
```

## How to use

##### 1. Declare feature on the script tag which has an attribute `"micro-app"`.

```
<script micro-app src="micro-app.min.js" capable></script>
```

##### 2. Select the script tag which has an attribute `"micro-app"` then set feature by `"setAttribute"`.

```
<script micro-app src="micro-app.min.js"></script>
<script>
    document.querySelector('script[micro-app]').setAttribute('capable', true);
</script>
```

##### 3. Assign feature on the global namespace `"microApp"`.

```
<script src="micro-app.min.js"></script>
<script>
    microApp.capable = true;
</script>
```

## Features
* `$` : Replace your value.
* `null` : Null can remove the feature.

##### capable
> `<meta name="apple-mobile-web-app-capable" content="yes">`

##### status-bar-style
> `<meta name="apple-mobile-web-app-status-bar-style" content="$">`

* Both `microApp["status-bar-style"]` and `microApp.statusBarStyle` are same.

##### title
> `<meta name="apple-mobile-web-app-title" content="$">`

##### icon
> `<link rel="apple-touch-icon" href="$">`

##### splash
> `<link rel="apple-touch-startup-image" href="$">`

##### href
* Save your link in `location.hash`.

## Multiple

Use `Array` and `Object` to set multiple `icon` and `splash`.
[@see /demo/jquery/entry/index.js](https://github.com/lixinliang/micro-app/blob/master/demo/jquery/entry/index.js)

## Methods

##### filter(...)
* Define a filter that filter the url about icon and splash.

| Argument | Description |
| --- | --- |
| String | filter name |
| Function | filter handler |

| Return values |
| --- |
| microApp |

##### hash(...)
* Get a value by `key` from `location.hash`.

| Argument | Description |
| --- | --- |
| String | key |

|Return values|
| --- |
|value|

* Set a value by `key` from `location.hash`.

| Argument | Description |
| --- | --- |
| String | key |
| String | value |

| Return values |
| --- |
| microApp |

## Filters

##### #precomposed
* Set the attribute `rel="apple-touch-icon-precomposed"`.

##### #autosize
* Set `sizes` or `media` after computed.

## License

MIT
