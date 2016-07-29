var
    gulp         = require('gulp'),
    del          = require('del'),
    sourcemaps   = require('gulp-sourcemaps'),
    jade         = require('gulp-jade'),
    autoprefixer = require('autoprefixer'),
    postcss      = require('gulp-postcss'),
    precss       = require('precss'),
    cssnano      = require('cssnano'),
    sprites      = require('postcss-sprites').default;
    plumber      = require('gulp-plumber'),
    imageMin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    stylefmt     = require('stylefmt'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create();

/*------------------------ paths --------------------------*/

var 
    paths = {
        jade : {
            location    : 'src/markups/**/*.jade',
            compiled    : 'src/markups/_pages/*.jade',
            destination : 'websitestructure/'
        },

        css : {
            location    : 'src/style/**/*.css',
            compiled    : 'src/style/main.css',
            destination : 'websitestructure/commons/css/'
        },
        
        img : {
            location    : 'src/img/**/*',
            stylesheet  : 'websitestructure/commons/css/',
            images      : 'src/img/images/*.jpg',
            logos       : 'src/img/logos/*.png',
            sprites     : 'src/img/sprite/*.png',
            destination : 'websitestructure/commons/images/'
        },

        js : {
            location    : 'src/script/*.js',
            destination : 'websitestructure/commons/js/',
            plugins     : 'src/script/vendor/**/*.js',
            pluginsDest : 'websitestructure/commons/js/vendor/'
        },

        browserSync : {
            baseDir    : 'websitestructure/',
            watchPaths : ['websitestructure/**/*.html', 'websitestructure/commons/css/**/*.css', 'websitestructure/commons/js/**/*.js' ]
        }
    }
/*-------------------------- jade ------------------------------*/

gulp.task('jade', function() {
    gulp.src(paths.jade.compiled)
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest(paths.jade.destination));
});


/*-------------------- browser-sync ----------------------*/

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});

/*---------------------- style -------------------------*/
gulp.task('style', function () {
    var processors = [
            precss(),
            sprites({
                stylesheetPath : paths.img.stylesheet,
                spritePath: paths.img.destination
            }),
            autoprefixer({browsers : [ '> 1%', 'last 2 versions', 'ie >= 7']}),
            stylefmt(),
            cssnano()
    ];
    gulp.src(paths.css.compiled)
        .pipe(plumber())
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.css.destination));
});


/*---------------------- images ---------------------------*/

gulp.task('img-min', function() {
    gulp.src([paths.img.logos, paths.img.images] )
        .pipe(imageMin({
            use:[pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest(paths.img.destination));
});

/*-------------------- js --------------------*/

gulp.task('js', function() {
    gulp.src(paths.js.location)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.js.destination));
});

/*------------------- plugins -----------------------------*/
gulp.task('plugins', function () {
    gulp.src(paths.js.plugins)
        .pipe(gulp.dest(paths.js.pluginsDest));
});

/*---------------- clean ------------*/

gulp.task('clean', function () {
    del(paths.img.destination);
});


/*------------------ build ------------------------*/

// gulp.tast('build', function() {
//      var processors = [
//             precss(),
//             sprites({
//                 stylesheetPath : paths.img.stylesheet,
//                 spritePath: paths.img.destination
//             }),
//             autoprefixer({browsers : [ '> 1%', 'last 2 versions', 'ie >= 7']}),
//             stylefmt()
//     ];
//     gulp.src(paths.css.compiled)
//         .pipe(plumber())
//         .pipe(postcss(processors))
//         .pipe(gulp.dest(paths.css.destination))
// })

/*----------------------- watch ---------------------------*/

gulp.task('watch', function() {
    gulp.watch(paths.css.location, ['style']);
    gulp.watch(paths.jade.location, ['jade']);
    gulp.watch(paths.js.location, ['js']);
    gulp.watch(paths.img.location, ['clean', 'img-min']);
    gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

gulp.task('default', ['jade', 'style', 'js', 'plugins', 'img-min', 'watch', 'sync']);