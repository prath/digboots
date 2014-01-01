path = require('path');
/**
 * Grunt task Runner
 *
 * @param  {object} grunt
 * @return {mixed} builded files
 */
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-cssbeautifier');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-newer');

	grunt.initConfig({

		/**
		 * clean all builded files
		 *
		 * @type {Object}
		 */
		clean: {
			all: ['dist/assets', 'dist/dummy-images', 'dist/style.css', 'dist//*.html', 'dist/*.ico', 'dist/*.png'],
			css: ['dist/assets/css', 'dist/style.css'],
			js: ['dist/assets/js'],
			img: ['dist/assets/images', 'dist/*.ico', 'dist/*.png'],
			dummy: ['dist/dummy-images'],
			template: ['dist/*.html']
		},

		/**
		 * livereload
		 *
		 * @type {Object}
		 * @todo still not working
		 */
		connect: {
			con: {
				options: {
					port: 3001,
					base: './'
				}
			}
		},

		/**
		 * Open Dist index in new tab browser
		 *
		 * @type {Object}
		 */
		open: {
			dev: {
				path: 'http://0.0.0.0:3001/dist'
			}
		},
		/**
		 * less tasks
		 */
		less: {
			compile: {
				options: {
					paths: ['src/less', 'src/less/inc', 'src/less/bootstrap-less'],
					ieCompat: true,
					dumpLineNumbers: true,
					sourceMap: true,
					// sourceMapFilename: 'sourceMap.css.map',
					sourceMapRootpath: 'http://0.0.0.0:3001/'
				},
				files: [{
					expand: true,
					cwd: 'src/less/',
					src: ['style.less'],
					dest: 'dist/',
					ext: '.css',
				}, {
					expand: true,
					cwd: 'src/less/',
					src: ['*.less', '!style.less'],
					dest: 'dist/assets/css',
					ext: '.css',
				}]
			},
		},

		/**
		 * minimize css files into *.min.css
		 *
		 * @type {css}
		 */
		cssmin: {
			minify: {
				files: [{
					expand: true,
					cwd: './',
					src: ['style.css'],
					dest: 'dist/assets/css',
					ext: '.min.css',
				}]
			}
		},
		/**
		 * autoprefix css
		 * @type {Object}
		 */
		autoprefixer: {
			dist: {
				options: {
					browsers: ['last 4 version', '> 1%', 'ie 8', 'ie 7']
				},
				files: [{
					expand: true,
					cwd: 'dist/assets/css',
					src: ['*.css', '!bootstrap.css', '!bootstrap-responsive.css'],
					dest: 'dist/assets/css',
					ext: '.css',
				}, {
					expand: true,
					cwd: 'dist/',
					src: ['style.css'],
					dest: 'dist/',
					ext: '.css',
				}]
			}
		},
		/**
		 * copy files tasks
		 *
		 * @type {Object}
		 */
		copy: {
			js: {
				files: [{
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: ['src/js/vendor/*'],
					dest: 'dist/assets/js/vendor/'
				}, {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: ['src/js/*'],
					dest: 'dist/assets/js/'
				}]
			},
			img: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'src/images/',
					src: ['**', '!favicons/**'],
					dest: 'dist/assets/images/'
				}, {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: ['src/images/favicons/*'],
					dest: 'dist/'
				}]
			},
			dummyimg: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'src/dummy-images',
					src: ['**'],
					dest: 'dist/dummy-images/'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					flatten: false,
					cwd: 'src/fonts/',
					src: ['**'],
					dest: 'dist/assets/fonts/'
				}]
			}
		},
		/**
		 * Dom manipulation tasks
		 *
		 * @type {Object}
		 */
		dom_munger: {
			target: {
				options: {
					read: {
						selector: 'script.concat',
						attribute: 'src',
						writeto: 'myJsRefs',
						isPath: true,
					}
				},
				src: 'dist/*.html'
			},
			targetCss: {
				options: {
					read: {
						selector: 'link.cm',
						attribute: 'href',
						writeto: 'myCssRefs',
						isPath: true,
					}
				},
				src: 'dist/*.html'
			},
			jsconcat: {
				options: {
					callback: function($) {
						$('script.concat:last').after('<script src="js/all/all.min.js"></script>');
						$('script.concat').remove();
					},
				},
				src: 'dist/*.html'
			},
			jscompress: {
				options: {
					callback: function($) {
						$('script.plugin').each(function(i) {
							src = $(this).attr('src');
							split = src.split('.js');
							concat = split[0] + '.min.js';
							$(this).attr('src', concat);
						});
					}
				},
				src: 'dist/*.html'
			},
			jsnone: {
				options: {
					callback: function($) {}
				},
				src: 'dist/*.html'
			},
			cssconcat: {
				options: {
					callback: function($) {
						$('link.cm:last').after('<link rel="stylesheet" href="css/all/mixed.css">');
						$('link.cm').remove();
					}
				},
				src: 'dist/*.html'
			},
			csscompress: {
				options: {
					callback: function($) {
						$('link.cm').each(function(i) {
							src = $(this).attr('href');
							split = src.split('.css');
							concat = split[0] + '.min.css';
							$(this).attr('href', concat);
						});
					}
				},
				src: 'dist/*.html'
			},
		},
		/**
		 * uglify js tasks
		 * @type {Object}
		 */
		uglify: {
			compress: {
				files: [{
					expand: true,
					src: '*.js',
					dest: 'dist/js',
					cwd: 'dist/js',
					ext: '.min.js'
				}]
			},
			concat: {
				src: ['<%= dom_munger.data.myJsRefs %>'],
				dest: 'dist/assets/js/all/all.min.js'
			}
		},
		/**
		 * concat files task
		 *
		 * @type {Object}
		 * @todo concat JS Files
		 */
		concat: {
			files: {
				src: ['<%= dom_munger.data.myCssRefs %>'],
				dest: 'dist/assets/css/mixed.css'
			}
		},
		/**
		 * Jade tasks
		 *
		 * @type {Object}
		 * @todo layout options variables (e.g. two columns, three columns, etc.)
		 */
		jade: {
			compile: {
				options: {
					data: {
						debug: true,
						title: 'Suave WordPress',
						css_dir: 'css',
						js_dir: 'js',
						img_dir: 'images',
					},
					pretty: true
				},
				files: [{
					expand: true,
					cwd: 'src/templates/',
					src: ['*.jade'],
					dest: 'dist/',
					ext: '.html',
				}]
			}
		},

		/**
		 * Prettify HTML Outputs
		 * 
		 * @type {Object}
		 */
		prettify: {
			options: {
				indent_char: '	',
				indent: 1,
				condense: true,
				brace_style: "expand",
				padcomments: true,
				indent_scripts: 'separate',
				preserve_newlines: true,
				unformatted: [
					"pre"
				]
			},
			all: {
				expand: true, 
				cwd: 'dist/', 
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/'
			}
		},

		/**
		 * Change CSS Indentation
		 *
		 * @type {Object}
		 * @todo other regarde tasks for js, image etc.
		 */
		cssbeautifier : {
			files : ['dist/assets/css/*.css', 'dist/*.css'],
			options : {
				indent: '	'
			}
		},

		/**
		 * Beautify HTML, CSS and JS
		 *
		 * @type {Object}
		 */
		jsbeautifier: {
			files: ["dist/**/*", '!dist/dummy-images/**/*', '!dist/assets/images/**/*', '!dist/assets/fonts/**/*', '!dist/assets/js/vendor/**/*'],
			options: {
				// config: "path/to/configFile",
				html: {
					braceStyle: "collapse",
					indentChar: "	",
					indentScripts: "keep",
					indentSize: 1,
					indentInnerHtml: true,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					unformatted: ["sub", "sup", "b", "u"],
					wrapLineLength: 0
				},
				css: {
					indentChar: "	",
					indentSize: 1
				},
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentChar: "	",
					indentLevel: 0,
					indentSize: 1,
					indentWithTabs: true,
					jslintHappy: false,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0
				}
			}
		},

		/**
		 * watch and guard tasks
		 *
		 * @type {Object}
		 * @todo other regarde tasks for js, image etc.
		 */
		watch: {
			options: {
				livereload: true,
				nospawn: true
			},
			css: {
				files: [
					'src/less/**/*.less'],
				tasks: [
					'clean:css', 'less', 'copy:fonts', 'autoprefixer']
			},
			scripts: {
				files: [
					 'src/js/**/*.js'],
				tasks: ['clean:js', 'copy:js']
			},
			imgs: {
				files: [
					'src/images/**/*'],
				tasks: ['clean:img', 'copy:img']
			},
			dummmyimgs: {
				files: [
					'src/dummy-images/**'],
				tasks: ['clean:dummy', 'copy:dummyimg']
			}
			// ,
			// templates: {
			// 	files: [
			// 		'src/templates/**/*'],
			// 	tasks: [
			// 		'jade'],
			// 	options: {
			// 		nospawn: true
			// 	}
			// }
		}
	});
	
	/**
	 * ======================================================================================================================================
	 */
	grunt.event.on('watch', function(action, filepath){
		// grunt.config(
		// 	['jade', 'compile', 'files'], 
		// 	[{
		// 		src: filepath, dest: 'dist/' + path.basename(filepath, '.jade') + '.html'
		// 	}]
		// );
		// grunt.config(
		// 	['clean', 'template'],
		// 	['dist/' + path.basename(filepath, '.jade') + '.html']
		// );
	});

	/**
	 * ======================================================================================================================================
	 */

	grunt.registerTask('default', ['clean:all', 
		'less', 'autoprefixer',
		'jade',
		'copy:img',
		'copy:dummyimg',
		'copy:js',
		'copy:fonts',
		'connect', 
		'open', 
		'watch'
	]);

	/**
	 * ======================================================================================================================================
	 */

	grunt.registerTask('beautify', ['jsbeautifier']);
};