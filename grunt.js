/*global config:true, task:true*/
config.init({
  pkg: '<json:package.json>',
  lint: {
    files: ['grunt.js', 'lib/**/*.js']
  },
  watch: {
    files: '<config:lint.files>',
    tasks: 'default'
  },
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      node: true,
      es5: true
    },
    globals: {}
  }
});

// Default task.
task.registerTask('default', 'lint');
