var createBrowserifyBundleConf = function(options){
	var bundles = {
		src: './src/app.js',
		dest: 'build/js/app.js'
	};
	bundles.options = options ? options : {};
	return bundles;
};

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dev: createBrowserifyBundleConf(),
			package: createBrowserifyBundleConf({keepAlive: false}),
			options: {
				// next two lines for watchify + watch instead of browserify
				watch: true,
				keepAlive: true,
				transform: ['node-lessify', 'node-underscorify'],
				browserifyOptions: {
					debug:true // include source maps.  currently only available with browserify
				}
			}
		},
		copy: {
			baseHtml: {
				files:[{
					cwd: 'src/',
					src: 'index.html',
					dest: 'build/',
					expand: true
				}]
			},
			images: {
				files:[{
					cwd: 'src/timeline/images/',
					src: '*.{jpg,gif,png}',
					dest: 'build/images/',
					expand: true
				}]
			}
		},
		concat: {
			dist: {
				src: ['css/layout.css', 'css/styles.css'],
				dest: 'build/css/stylesheet.css'
			}
		},
		clean: ['build'],
		concurrent: {
			dev: {
				tasks: ['browserify:dev', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		watch:{
			copyable: {
				files: ['src/index.html', 'src/timeline/images/*.{jpg,gif,png}'],
				tasks: ['copy']
			},
			concatable: {
				files: ['css/layout.css', 'css/styles.css'],
				tasks: ['concat']
			}
		},
		uglify: {
			app: {
				files: { 'build/js/app.js' : ['build/js/app.js'] },
				options: {
					sourceMap: true,
					sourceMapName: 'build/js/app.js.map'
				}
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-debug-task');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('buildProd', ['clean', 'browserify:package', 'uglify', 'copy', 'concat']);
	grunt.registerTask('dev', ['clean', 'copy', 'concat', 'concurrent:dev']);
};