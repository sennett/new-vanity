module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		browserify: {
			timeline: {
				src: './src/app.js',
				dest: 'build/app.js'
			},
			options:{
				watch:true,
				keepAlive: true,
				transform:['node-lessify', 'node-underscorify']
			}
		},
		debug: {
			options: {
				open: false // do not open node-inspector in Chrome automatically
			}
		}
    });

	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify']);

	//grunt.loadNpmTasks('grunt-debug-task');
};