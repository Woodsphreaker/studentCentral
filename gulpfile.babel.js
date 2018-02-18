import gulp from 'gulp'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import cleanCSS from 'gulp-clean-css'
import watch from 'gulp-watch'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import babelify from 'babelify'
import buffer from 'vinyl-buffer'

// const gulp = require('gulp')
// const uglify = require('gulp-uglify')
// const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// const cleanCSS = require('gulp-clean-css')
// const watch = require('gulp-watch')

// const concatCss = require('gulp-concat-css')
// const gutil = require('gulp-util')
// const convertEncoding = require('gulp-convert-encoding')

const uglifyOptions = {
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  },
  output: {
    comments: false
  }
}

// ##################### SYSTEM COMPONENTS #####################

// APIS do sistema - Nivel de alteração: ALTO
const APIS = ['async/source/**/*.js',
  'bancoQuestoes/source/**/*.js',
  'banners/source/**/*.js',
  'busca/source/**/*.js',
  'calendario/source/**/*.js',
  'combo/source/**/*.js',
  'comentarios/source/**/*.js',
  'cotas/source/**/*.js',
  'cursos/source/**/*.js',
  'datatables/source/**/*.js',
  'ckeditor/source/**/*.js',
  'enquete/source/**/*.js',
  'export/source/**/*.js',
  'galeria/source/**/*.js',
  'global/source/**/*.js',
  'hits/source/**/*.js',
  'helpers/source/**/*.js',
  'likes/source/**/*.js',
  'lobibox/source/**/*.js',
  'modal/source/**/*.js',
  'multimidia/source/**/*.js',
  'paginacao/source/**/*.js',
  'reader/source/**/*.js',
  'RedirecionamentoModulo/source/**/*.js',
  'ReportTable/source/**/*.js',
  'Treinamentos/source/**/*.js',
  'UploadFive/source/**/*.js',
  'Workspaces/source/**/*.js'
]

// Funções Custom - Nivel de alteração: BAIXO
const CUSTOM = [
  './FuncoesGerais.js',
  './Graficos.js',
  './hightChart/highcharts.js',
  './hightChart/highcharts-3d.src.js',
  './hightChart/modules/exporting.js',
  './boxes.js',
  '../unify/1_8/assets/js/custom.js',
  './startScripts/source/index.js' // Inicia os módulos da aplicação
]

// Bibliotecas do sistema - Nivel de alteração: BAIXO
const VENDORS = [
  './jquery-1.12.0.min.js',
  './jquery-ui.min.js',
  './jquery-migrate-1.3.0.js',
  '../unify/1_8/assets/plugins/bootstrap/js/bootstrap.min.js',
  './jquery.serializeobject.js',
  './angular.1.5.8.min.js',
  './angular-sanitize.js'
]

// Bibliotecas do sistema - Nivel de alteração: BAIXO
const GMAPS = [
  './GMaps/scripts/jquery.ui.map.js',
  './GMaps/scripts/jquery.ui.maps.services.js',
  './GMaps/scripts/jquery.ui.maps.extensions.js'
]

// Plugins do sistema - Nivel de alteração: BAIXO
const PLUGINS = [
  '../unify/1_8/assets/plugins/back-to-top.js',
  '../unify/1_8/assets/plugins/flexslider/jquery.flexslider-min.js',
  '../unify/1_8/assets/plugins/revolution-slider/rs-plugin/js/jquery.themepunch.tools.min.js',
  '../unify/1_8/assets/plugins/revolution-slider/rs-plugin/js/jquery.themepunch.revolution.min.js',
  '../unify/1_8/assets/plugins/smoothScroll.js',
  '../unify/1_8/assets/plugins/jquery.parallax.js',
  '../unify/1_8/assets/plugins/parallax-slider/js/modernizr.js',
  '../unify/1_8/assets/plugins/parallax-slider/js/jquery.cslider.js',
  '../unify/1_8/assets/plugins/counter/waypoints.min.js',
  '../unify/1_8/assets/plugins/counter/jquery.counterup.min.js',
  '../unify/1_8/assets/plugins/fancybox/source/jquery.fancybox.pack.js',
  '../unify/1_8/assets/plugins/owl-carousel/owl-carousel/owl.carousel.js',
  '../unify/1_8/assets/plugins/layer-slider/layerslider/js/greensock.js',
  '../unify/1_8/assets/plugins/layer-slider/layerslider/js/layerslider.transitions.js',
  '../unify/1_8/assets/plugins/layer-slider/layerslider/js/layerslider.kreaturamedia.jquery.js',
  '../unify/1_8/assets/js/plugins/revolution-slider.js',
  '../unify/1_8/assets/plugins/jquery-appear.js',
  '../unify/1_8/assets/js/plugins/parallax-slider.js',
  '../unify/1_8/assets/plugins/circles-master/circles.js',
  '../unify/1_8/assets/plugins/scrollbar/js/jquery.mCustomScrollbar.concat.min.js',
  '../unify/1_8/assets/js/plugins/datepicker.js',
  '../unify/1_8/assets/js/plugins/circles-master.js',
  '../unify/1_8/assets/js/plugins/owl-carousel.js',
  '../unify/1_8/assets/js/plugins/revolution-slider.js',
  '../unify/1_8/assets/js/plugins/style-switcher.js',
  '../unify/1_8/assets/plugins/image-hover/js/modernizr.js',
  '../unify/1_8/assets/plugins/image-hover/js/touch.js',
  '../unify/1_8/assets/plugins/jquery.mixitup.min.js',
  '../unify/1_8/assets/plugins/master-slider/masterslider/masterslider.js',
  '../unify/1_8/assets/plugins/master-slider/masterslider/jquery.easing.min.js',
  './DataTables/datatables.min.js',
  './DataTables/Momment/moment.min.js',
  './DataTables/Momment/datetime-moment.js',
  './footable/js/footable.js',
  './footable/js/footable.paginate.js',
  './footable/js/footable.sort.js',
  './footable/js/footable.filter.js',
  './jquery.colorpicker.js',
  './jquery.classygradient.js',
  './dragscroolable.js',
  './LobiBox/dist/js/lobibox.js',
  './Paginacao/jquery.twbsPagination.js',
  './jquery.cookie.js',
  './Calendario/full/lib/moment.min.js',
  './Calendario/full/fullcalendar.js',
  './Calendario/full/locale/locale-all.js',
  '../unify/1_8/assets/js/app.js',
  './bootbox.min.js',
  './colpick.js',
  './jquery.reveal.js',
  './jquery.mask.1.14.0.min.js',
  './jquery.maskMoney.js',
  './jquery.msgBox.js',
  './jquery.MsgBoxDida.js',
  './jquery.cpf.validate.js',
  '../unify/1_8/assets/plugins/sky-forms-pro/skyforms/js/jquery.validate.min.js',
  './UploadFive/jquery.uploadifive.min.js',
  './jQuery.print.js',
  './jquery.printElement.js',
  // './ckeditor/ckeditor.js',
  '../unify/1_8/assets/js/plugins/owl-carousel.js',
  '../unify/1_8/assets/js/plugins/fancy-box.js',
  '../unify/1_8/assets/js/plugins/layer-slider.js',
  '../unify/1_8/assets/js/pages/page_portfolio.js',
  '../unify/1_8/blog/assets/js/plugins/master-slider-showcase1.js',
  '../unify/1_8/assets/js/plugins/progress-bar.js'
]

// ************* CSS ****************
// Styles do sistema - Nivel de alteração: BAIXO
const SYSTEM_CSS = [
  '../unify/1_8/assets/plugins/bootstrap/css/bootstrap.min.css',
  '../unify/1_8/assets/css/style.css',
  '../unify/1_8/assets/css/headers/header-default.css',
  '../unify/1_8/assets/css/headers/header-v1.css',
  '../unify/1_8/assets/css/headers/header-v3.css',
  '../unify/1_8/assets/css/headers/header-v6.css',
  '../unify/1_8/assets/css/footers/footer-v1.css',
  '../unify/1_8/assets/css/footers/footer-v6.css',
  '../unify/1_8/assets/plugins/animate.css',
  '../unify/1_8/assets/plugins/line-icons/line-icons.css',
  '../unify/1_8/assets/plugins/fancybox/source/jquery.fancybox.css',
  '../unify/1_8/assets/plugins/font-awesome/css/font-awesome.min.css',
  '../unify/1_8/assets/plugins/scrollbar/css/jquery.mCustomScrollbar.css',
  '../unify/1_8/assets/plugins/revolution-slider/rs-plugin/css/settings.css',
  '../unify/1_8/assets/plugins/owl-carousel/owl-carousel/owl.carousel.css',
  '../unify/1_8/assets/plugins/layer-slider/layerslider/css/layerslider.css',
  '../unify/1_8/assets/plugins/sky-forms-pro/skyforms/css/sky-forms.css',
  '../unify/1_8/assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms.css',
  '../unify/1_8/assets/plugins/image-hover/css/img-hover.css',
  '../unify/1_8/assets/plugins/parallax-slider/css/parallax-slider.css',
  '../unify/1_8/assets/plugins/brand-buttons/brand-buttons-inversed.css',
  '../css/reveal.css',
  '../css/msgBoxLight.css',
  './DataTables/datatables.css',
  '../unify/1_8/blog/assets/plugins/master-slider/masterslider/style/masterslider.css',
  '../unify/1_8/blog/assets/plugins/master-slider/masterslider/skins/default/style.css',
  './footable/css/footable.core.css',
  './footable/css/footable.standalone.css',
  '../css/colpick.css',
  '../css/jquery.colorpicker.css',
  '../css/jquery.classygradient.min.css',
  './LobiBox/dist/css/lobibox.css',
  './UploadFive/uploadifive.css',
  '../unify/1_8/assets/css/pages/page_log_reg_v1.css',
  '../unify/1_8/assets/css/pages/profile.css',
  '../unify/1_8/assets/css/pages/shortcode_timeline2.css',
  '../unify/1_8/assets/css/pages/page_job.css',
  '../unify/1_8/assets/css/pages/page_job_inner.css',
  '../unify/1_8/assets/css/pages/page_job_inner1.css',
  '../unify/1_8/assets/css/pages/page_job_inner2.css',
  '../unify/1_8/assets/css/pages/portfolio-v2.css',
  '../unify/1_8/assets/css/pages/page_404_error.css',
  '../unify/1_8/assets/css/pages/shortcode_timeline1.css',
  '../unify/1_8/assets/css/pages/page_search_inner.css',
  '../unify/1_8/assets/css/pages/page_search_inner_tables.css',
  '../unify/1_8/Shop-UI/assets/css/shop.style.css',
  '../unify/1_8/blog/assets/css/blog.css',
  './Calendario/full/fullcalendar.css'
]

gulp.task('APIS', function () {
  // return watch(APIS, function () {
  return gulp
    .src(APIS)
    .pipe(babel())
    .pipe(concat('apis.js'))
    .pipe(gulp.dest('../modules/public/js/'))
  // })
})

gulp.task('CUSTOM', function () {
  return gulp
    .src(CUSTOM)
    .pipe(uglify(uglifyOptions))
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('../modules/public/js/'))
})

gulp.task('VENDORS', function () {
  return gulp
    .src(VENDORS)
    .pipe(uglify(uglifyOptions))
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('../modules/public/js/'))
})

gulp.task('GMAPS', function () {
  return gulp
    .src(GMAPS)
    .pipe(uglify(uglifyOptions))
    .pipe(concat('gmaps.js'))
    .pipe(gulp.dest('../modules/public/js/'))
})

gulp.task('PLUGINS', function () {
  return gulp
    .src(PLUGINS)
    .pipe(uglify(uglifyOptions))
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('../modules/public/js/'))
})

gulp.task('SYSTEM_CSS', function () {
  return gulp
    .src(SYSTEM_CSS)
    .pipe(cleanCSS({ compatibility: 'ie8', debug: true, rebase: false }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('../modules/public/css/'))
})

gulp.task('ALL_TASKS_JS', ['APIS', 'CUSTOM', 'VENDORS', 'PLUGINS'])
gulp.task('ALL_TASKS_CSS', ['SYSTEM_CSS'])

// ##################### LOGIN COMPONENTS #####################
const LOGIN_CSS = [
  '../css/bootstrap.css',
  '../css/app.css',
  '../css/style.css',
  '../css/reveal.css',
  '../css/msgBoxLight.css',
  '../css/uploadifive.css',
  '../css/sky-forms.css',
  '../css/brand-buttons.css',
  '../css/brand-buttons-inversed.css',
  '../css/supersized.css',
  '../css/supersized.shutter.css',
  '../unify/1_8/assets/css/pages/page_log_reg_v2.css',
  '../unify/1_8/blog/assets/css/theme-colors/red.css',
  './LobiBox/dist/css/lobibox.css'
]

const LOGIN_COMPONENTS = [
  './jquery-1.10.2.min.js',
  './jquery-ui.min.js',
  './jquery-migrate-1.2.1.min.js',
  './bootstrap.min.js',
  './bootbox.min.js',
  './style-switcher.js',
  './jquery.reveal.js',
  './jquery.mask.min.js',
  './jquery.msgBox.js',
  './jquery.cpf.validate.js',
  './jquery.easing.min.js',
  './supersized.3.2.7.min.js',
  './supersized.shutter.min.js',
  './FuncoesGerais.js',
  './Facebook.js',
  './LobiBox/dist/js/lobibox.js',
  './LobiBox/dist/js/messageboxes.js',
  './LobiBox/dist/js/notifications.js',
  './LobiBox/LobiboxAPI.js'
]

gulp.task('LOGIN_CSS', function () {
  return gulp
    .src(LOGIN_CSS)
    .pipe(cleanCSS({ compatibility: 'ie8', debug: true, rebase: false }))
    .pipe(concat('login.css'))
    .pipe(gulp.dest('../modules/public/css/'))
})

gulp.task('LOGIN_COMPONENTS', function () {
  return gulp
    .src(LOGIN_COMPONENTS)
    .pipe(uglify())
    .pipe(concat('login.js'))
    .pipe(gulp.dest('../modules/public/js/'))
})

// TASK Trilhas
const TRILHAS_ADMIN = [
  'trilhas/source/admin/*.js'
]

gulp.task('TRILHAS_ADMIN', function () {
  return watch(TRILHAS_ADMIN, function () {
    gulp
      .src(TRILHAS_ADMIN)
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat('trilhasAdmin.js'))
      .pipe(gulp.dest('../modules/public/js/'))
  })
})

const STUDENT_CENTRAL = [
  'studentCentral/source/*.js',
  './Helpers/modules/**/*.js'
]

// gulp.task('STUDENT_CENTRAL', function () {
//   return watch(STUDENT_CENTRAL, function () {
//     gulp
//       .src(STUDENT_CENTRAL)
//       .pipe(babel())
//       .pipe(uglify())
//       .pipe(concat('studentCentral.js'))
//       .pipe(gulp.dest('../modules/public/js/'))
//   })
// })

gulp.task('SC', () => {
  browserify({
    entries: ['./StudentCentral/source/main.js'],
    extensions: [ '.js' ],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('studentCentral.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('../modules/public/js/'))
})

gulp.task('STUDENT_CENTRAL', () => {
  gulp.watch(STUDENT_CENTRAL, ['SC'])
})

// USAGE - gulp [ taskname ]
