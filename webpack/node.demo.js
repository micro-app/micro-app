'use strict';

let fs = require('fs');
let path = require('path');
let fse = require('fs-extra');
let shell = require('shelljs');
let packageJson = require('../package.json');

const filename = packageJson.name;

let entry = {};

let cmd = {
    dev : 'webpack-dev-server --inline --quiet --devtool eval --progress --colors --content-base ./demo/ --hot --config ./webpack/webpack.demo.js --host 0.0.0.0',
    build : 'npm run build',
};

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
    fs.readFile(path.join(__dirname, `../src/${ filename }.js`), ( err ) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
}).then(() => {
	return new Promise(( resolve, reject ) => {
		fs.readFile(path.join(__dirname, `../dist/${ filename }.min.js`), 'utf8', ( err, data ) => {
			if (err) {
                let result = shell.exec(cmd.build);
                if (result.code === 0) {
        			resolve();
        		} else {
        			reject(result.stderr);
        		}
			} else {
                let date = [];
                try {
                    date.push(data.split(/\n/)[4].split('Update')[1]);
                } catch (e) {}
                resolve(date);
            }
		});
	});
}).then(( date ) => {
	return new Promise(( resolve, reject ) => {
        if (date.length) {
            fs.readFile(path.join(__dirname, `../demo/${ filename }.min.js`), 'utf8', ( err, data ) => {
    			if (err) {
                    resolve();
    			} else {
                    try {
                        date.push(data.split(/\n/)[4].split('Update')[1]);
                    } catch (e) {}
                    if (date.length == 2) {
                        resolve(date);
                    } else {
                        resolve();
                    }
                }
    		});
        } else {
            resolve();
        }
	});
}).then(( date ) => {
    return new Promise(( resolve, reject ) => {
        if (date && date[0] === date[1]) {
            resolve();
            console.log(`${ filename }.min.js has not changed`);
        } else {
            fse.copy(path.join(__dirname, `../dist/${ filename }.min.js`), path.join(__dirname, `../demo/${ filename }.min.js`), (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }
    });
}).then(() => {
    return new Promise(( resolve, reject ) => {
        let content = path.join(__dirname, '../demo/');
        fs.readdir(content, ( err, files ) => {
            if (err) {
                reject(err);
                return
            }
            files.forEach(( directory ) => {
                let js = `${ content }${ directory }/entry/index.js`;
                if (fs.existsSync(js)) {
                    entry[`${ directory }/index`] = js;
                }
            });
            fs.writeFileSync(path.join(__dirname, './entry.js'), `module.exports = ${ JSON.stringify(entry) }`);
            shell.exec(cmd.dev);
        });
    });
}).catch((err) => {
    console.log(err);
}).done();
