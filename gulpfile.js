const {src,dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function compilarSass(done){
    src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error',() =>{
        console.log('Error en la compilacion sass: '+sass.logError());
        done();
    }))    
    .pipe(dest('css/'))
    .on('end',() =>{
        console.log('Codigo sass compilado correctamente');
        done();
    })        
}

function dev(done){
    watch('sass/**/*.scss',compilarSass);
    done();
}

exports.dev = dev;