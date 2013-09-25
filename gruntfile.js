// Diese Datei beschreibt den Build-Prozess der App. Das Programm "grunt"
// liest diese Datei ein und kompiliert unsere App entsprechend.

module.exports = function(grunt){

'strict mode';

// Das an die Funktion grunt.initConfig() übergebene Objekt regelt den
// Buildprozess. Details unter http://gruntjs.com/
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  // JSHint kontrolliert JavaScript-Dateien auf guten Stil. Im Detail kann man
  // einiges umkonfigurieren, siehe http://www.jshint.com/ und
  // https://github.com/gruntjs/grunt-contrib-jshint
  // Allerdings sind die Standardwerte schon ganz sinnvoll :)
  jshint: {
    all: ['gruntfile.js', 'src/**/*.js']
  },

  // Jade erzeugt HTML-Dateien aus einer vereinfachten Syntax. Für Details siehe
  // http://jade-lang.com/reference/
  jade: {
    all: {
      options: {
        data: {
          siteTitle: 'Workshop-App'
        }
      },
      files: (function(){
        var files = {
        'app/fragebogen.html': 'src/fragebogen.jade',
		'app/ausgabe.html': 'src/ausgabe.jade'
      };
        var pattern = 'src/widgets/**/*.jade';
        var jadeFiles = grunt.file.expand(pattern);
        jadeFiles.forEach(function(file){
          var output = file.replace('.jade', '.html');
          files[output] = file;
        });
        return files;
      })()
    }
  },

  // RequireJS optimiert AMD-Module zusammen. Beachten, dass mit Bower
  // installierte Komponenten im path angegeben werden sollten, damit die
  // Verwendung etwas einfacher wird.
  requirejs: {
    index1: {
      options: {
        baseUrl: 'src',
        paths: require('./gruntconfig.js').paths,
        name: 'fragebogen',
        out: 'app/fragebogen.js',
        optimize: 'none'
      }
    },
	index2: {
      options: {
        baseUrl: 'src',
        paths: require('./gruntconfig.js').paths,
        name: 'ausgabe',
        out: 'app/ausgabe.js',
        optimize: 'none'
      }
    }
  },

  stylus: {
    compile: {
      options: {
        //
      },
      files: (function() {
        var files = {};
        var pattern = 'src/widgets/**/*.styl';
        var stylusFiles = grunt.file.expand(pattern);
        stylusFiles.forEach(function(file){
          var output = file.replace('.styl', '.css');
          files[output] = file;
        });
        return files;
      })()
    }
  },

  concat: {
    options: {
      separator: '',
    },
    dist: {
      src: ['src/widgets/**/*.css'],
      dest: 'app/main.css'
    },
  },
  
  copy: {
    dist: {
      files: 
          [{
          src: 'src/widgets/**/*.mp4' ,
          dest: 'app/',
          expand: true,
          flatten: true,
          filter: 'isFile'
          }]
      }
    },

  clean: ['src/widgets/**/*.html', 'src/widgets/**/*.css']

});

// Lädt die Standard-Plugin-Sammlung von Grunt. Details siehe
// https://github.com/gruntjs/grunt-contrib)
grunt.loadNpmTasks('grunt-contrib');

// Diese Abfolge an Tasks wird bei einem normalen Aufruf von "grunt"
// abgearbeitet
grunt.registerTask('default', [ 'jshint', 'jade', 'requirejs', 'stylus', 'concat', 'copy', 'clean']);
//

};