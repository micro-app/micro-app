'use strict';

let fs = require('fs');
let path = require('path');
let fse = require('fs-extra');
let shell = require('shelljs');
let colors = require('colors');
let packageJson = require('../package.json');

const filename = packageJson.name;

Promise.prototype.done = function ( onFulfilled, onRejected ) {
	this
	.then(onFulfilled, onRejected)
 	.catch(( reason ) => {
    	setTimeout(() => {
			throw reason;
		}, 0);
    });
};

(new Promise(( resolve, reject ) => {
	fse.remove('./dist/*', ( err ) => {
	  	if (err) {
			reject(err);
		}
		resolve();
	});
})).then(() => {
	return new Promise(( resolve, reject ) => {
		fs.readFile(path.join(__dirname, `../src/${ filename }.js`), ( err ) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
}).then(() => {
    return new Promise(( resolve, reject ) => {
		let result = shell.exec('webpack --progress --colors --config ./webpack/webpack.build.js');
        if(result.code === 0){
			resolve();
		}else{
			reject(result.stderr);
		}
    });
}).then(() => {
    console.log('build complete!'.green);
}).catch((err) => {
    console.log(err);
}).done();
