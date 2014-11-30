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
            files: './src/**/*',
            dest: 'build/app.js'
          }
        }
    });
    
    
    // grunt.loadNpmTasks('grunt-browserify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.registerTask('default', ['browserify']);
    
    grunt.loadNpmTasks('grunt-watchify');
    grunt.registerTask('default', ['watchify']);
};