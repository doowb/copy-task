'use strict';

var Composer = require('composer');
var copy = require('../');

var app1 = new Composer('app1');
var app2 = new Composer('app2');

app1.task('foo', function(cb) {
  console.log('app1 > foo');
  cb();
});

app1.task('bar', ['foo'], function(cb) {
  console.log('app1 > bar');
  cb();
});

app1.task('baz', ['bar'], function(cb) {
  console.log('app1 > baz');
  cb();
});

copy(app1, app2, 'baz');

app2.build('baz', function(err) {
  if (err) return console.error(err);
  console.log('done');
});
