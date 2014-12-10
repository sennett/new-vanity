module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			timeline: {
				src: './src/app.js',
				dest: 'build/app.js'
			},
			options: {
				// next two lines for watchify + watch instead of browserify
				watch: true,
				keepAlive: true,
				transform: ['node-lessify', 'node-underscorify'],
				debug: true,
				browserifyOptions: {
					debug:true // include source maps.  currently only available with browserify
				}
			}
		},
		copy: {
			baseHtml: {
				files:[{
					src: ['index.html'],
					dest: 'build/'
				}]
			}
		},
		debug: {
			options: {
				open: false // do not open node-inspector in Chrome automatically
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['browserify']);

	//grunt.loadNpmTasks('grunt-debug-task');
};