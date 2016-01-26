/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var copy = require('broccoli-copy');
var Funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new Angular2App(defaults);
  return merge(
    [new Funnel('node_modules', {
      include: [
        'angularfire2/**/*.js',
        'rxjs/**/*.js',
        'firebase/**/*.js'],
      destDir: '/vendor/'
    }),
    app.toTree()], {
      overwrite: true
    });
}
