var fs = require('fs');
var path = require('path');
var _ = require('lodash');


function _walks(dir, ext, cb) {
    fs.readdirSync(dir).forEach(function (file) {
        if (file == "index.js") return false;
        var stat = fs.statSync(path.join(dir, file));

        if (stat.isDirectory()) {
            _walks(path.join(dir, file),ext, cb);
        }

        if (! file.endsWith( ext) || !stat.isFile()) {
            return;
        }

        cb(path.join(dir, file));
    });

}

exports.walk_js = function(dir, cb) {
    _walks(dir, '.js', cb);
}

exports.walk = function(dir, find, cb) {
    _walks(dir, find, cb);
}



/**
 * Process a directory and applies a callback for each file
 * passing the callback a a random list of parameters.
 * Normally used to initialize a module
 * @param dirname
 * @param cb
 * @returns {{init: Function}}
 */
exports.process_modules = function (dirname, cb) {
    return {
        init: function () {
            var save_args = arguments;
            exports.walk_js(dirname,   function (fn) {
                var _args = _.map(save_args, function (arg) {
                    return arg;
                });
                _args.push(fn);
                // console.log(_args);
                cb.apply(null, _args);
            });

        }
    };
};
