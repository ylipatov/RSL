module.exports = function (gulp, plugins) {
    function onError(e) {
        console.log(e.toString());
        this.emit('end');
    }

     /* Paths */
     let optionsHtml = {
        indent_with_tabs: true,
        max_preserve_newlines: 0,
        indentSize: 2,
        unformatted: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text', 'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt']
    };
    /* End Paths */

    return async function () {
        gulp.src('./njk/*.html')
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.data(function (file) {
                return JSON.parse(plugins.fs.readFileSync('./njk/data/data.json'));
            }))
            .pipe(plugins.nunjucks.compile())
            .pipe(plugins.htmlBeautify(optionsHtml))
            .pipe(gulp.dest('../'));
    }
}
