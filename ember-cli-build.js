/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var copy = require('broccoli-copy');
var Funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new Angular2App(defaults);
  return merge(
    [new Funnel('node_modules/angularfire2', {
      include: ['**/**'],
      exclude: ['LICENSE'],
      destDir: '/vendor/angularfire2/'
    }),
    new Funnel('node_modules/firebase/lib', {
      include: ['**/**'],
      exclude: ['LICENSE'],
      destDir: '/vendor/firebase/'
    }),
    app.toTree()]);
}
