module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // browserify: {
        //   dist: {
        //     files: {
        //       'build/app.js': 'src/**/*.js',
        //     },
        //     options: {
        //       transform: ['node-underscorify', 'grunt-less-browserify']
        //     }
        //   }
        // },
        // watch: {
        //   scripts: {
        //     files: 'src/**/*',
        //     tasks: 'default'
        //   }
        // },
        
        watchify: {
          scripts: {
            src: './src/app.js',
            dest: 'build/app.js'
          },
			options:{
				callback:function(browserify){
					browserify.transform('node-lessify');
					browserify.transform('node-underscorify');
					return browserify;
				}
			}
        },
		debug: {
			options: {
				open: false // do not open node-inspector in Chrome automatically
			}
		}
    });
    
    
    // grunt.loadNpmTasks('grunt-browserify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.registerTask('default', ['browserify']);
    
    grunt.loadNpmTasks('grunt-watchify');
    grunt.registerTask('default', ['watchify']);

	grunt.loadNpmTasks('grunt-debug-task');
};