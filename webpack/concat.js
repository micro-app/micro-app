'use strict';

let fs = require('fs');
let path = require('path');
let fse = require('fs-extra');

// concat util
let src = path.join(__dirname, '../src/modules/util/');
let dest = path.join(__dirname, '../src/modules/util.js');

module.exports = new Promise(( resolve, reject ) => {
    let result = [];
    fs.readdir(src, ( err, files ) => {
        if (err) {
            reject(err);
            return
        }
        if (process.platform == 'win32') {
            // put `_variable` first
            files.unshift(files.pop());
        }
        files.forEach(( file ) => {
            result.push(`//---------- ./${ file } ----------\n`);
            result.push(fs.readFileSync(path.join(src, file)).toString());
        });
        fs.writeFileSync(dest, result.join(''));
        resolve();
    });
});
