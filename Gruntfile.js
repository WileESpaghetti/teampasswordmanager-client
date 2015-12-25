module.exports = function(grunt) {

	grunt.initConfig({
		jasmine: {
			test: {
				src: 'src/**/*.js',
				options: {
					specs: 'spec/*Spec.js',
					helpers: 'spec/*Helper.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('default', []);
	grunt.registerTask('test', ['jasmine:test']);

};
