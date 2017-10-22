var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    let p = path.join.apply(path, [_root].concat(args));
    console.log('## Helper path: ' + p);
    return p;
}
exports.root = root;