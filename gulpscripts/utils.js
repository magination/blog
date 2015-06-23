var join = require("path").resolve;
var base = '';

var notify = require('gulp-notify');
var fs = require('fs');

module.exports = {
    base: base,
    output: './frontend/assets/',
    path: {
        "scripts": join(base, "frontend/app/app.js"),
        "scriptsWatch": join(base, "frontend/app/**/*.js"),
        "jshintrc": join(base, ".jshintrc"),
        "less": join(base, "frontend/styles/styles.less"),
        "lessWatch": join(base, "frontend/styles/**/*.less")
    },

    join: join,

    plumb: {
        errorHandler: notify.onError('Error: <%- error.message %>')
    }
};