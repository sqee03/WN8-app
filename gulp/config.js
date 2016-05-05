module.exports = {
    source: {
        js: {
            main: 'app/app.js',
            src: 'app/**/*.js'
        },
        tpl: {
            main: 'app/index.html',
            src: 'app/**/*.html'
        },
        sass: {
            bootstrap: 'bower_components/bootstrap-sass/assets/stylesheets',
            src: 'app/**/*.scss'
        },
        json: 'app/**/*.json',
        images: 'app/img/*.*'
    },
    build: {
        main: 'dist',
        vendor_js: 'dist/bower_components/*.js',
        vendor_css: 'dist/bower_components/*.css',
        offline: 'dist/js/offline.js',
        js: 'dist/js/*.js',
        json: 'dist/json/*.json',
        css: 'dist/css/*.css',
        tpl: 'dist/templates/*.js',
        index: 'dist/index.html'
    }
};