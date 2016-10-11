exports.parseArgument = function ( expression ) {
    let left = /\(/.test(expression);
    let right = /\)/.test(expression);
    if (left || right) {
        try {
            if (!left) {
                throw new SyntaxError('[micro-app] Missing "(" before argument list.');
            }
            if (!right) {
                throw new SyntaxError('[micro-app] Missing ")" after argument list.');
            }
            if (!/\)$/.test(expression)) {
                throw new SyntaxError(`[micro-app] Unexpected end of "${ expression.match(/.*(\).*$)/)[1] }".`);
            }
            let temp = expression.match(/(.*?)\((.*)\)$/);
            let methodName = temp[1];
            let methodArgument = temp[2];
            return [methodName, JSON.parse(`[${ methodArgument }]`)];
        } catch (e) {
            // Function will be stoped cause throw an error sync
            setTimeout(() => {
                throw e;
            }, 0);
            return [''];
        }
    } else {
        return [expression, []];
    }
};
