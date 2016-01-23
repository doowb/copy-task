/*!
 * copy-task <https://github.com/doowb/copy-task>
 *
 * Copyright (c) 2016 .
 * Licensed under the MIT license.
 */

'use strict';

require('mocha');
var assert = require('assert');
var Composer = require('composer');
var copy = require('./');

describe('copy-task', function () {
  it('should throw error when `from` is not created from composer', function (cb) {
    try {
      copy({});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected `from` to use `composer`.');
      cb();
    }
  });

  it('should throw error when `to` is not created from composer', function (cb) {
    var from = new Composer('from');
    try {
      copy(from, {});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected `to` to use `composer`.');
      cb();
    }
  });

  it('should throw error when `name` is undefined', function (cb) {
    var from = new Composer('from');
    var to = new Composer('to');
    try {
      copy(from, to);
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected `name` to be a string');
      cb();
    }
  });

  it('should throw error when `name` is not on `from.tasks`', function (cb) {
    var from = new Composer('from');
    var to = new Composer('to');
    try {
      copy(from, to, 'foo');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, '"foo" not found in tasks');
      cb();
    }
  });

  it('should copy simple task from `from` to `to`', function() {
    var from = new Composer('from');
    var to = new Composer('to');
    from.task('default', function(cb) {cb();});
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'undefined');
    copy(from, to, 'default');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'object');
  });

  it('should copy a task with a dependency from `from` to `to`', function() {
    var from = new Composer('from');
    var to = new Composer('to');
    from.task('foo', function(cb) {cb();});
    from.task('default', ['foo'], function(cb) {cb();});

    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'undefined');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'undefined');

    copy(from, to, 'default');
    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'object');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'object');
    assert.deepEqual(to.tasks.default.deps, ['foo']);
  });

  it('should copy a task with a dependency and options from `from` to `to`', function() {
    var from = new Composer('from');
    var to = new Composer('to');
    from.task('foo', function(cb) {cb();});
    from.task('default', {flow: 'parallel'}, ['foo'], function(cb) {cb();});

    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'undefined');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'undefined');

    copy(from, to, 'default');
    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'object');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'object');
    assert.deepEqual(to.tasks.default.deps, ['foo']);
    assert.deepEqual(to.tasks.default.options, {deps: ['foo'], flow: 'parallel'});
  });

  it('should copy deeply nested tasks dependencies from `from` to `to`', function() {
    var from = new Composer('from');
    var to = new Composer('to');
    from.task('foo', function(cb) {cb();});
    from.task('bar', ['foo'], function(cb) {cb();});
    from.task('baz', ['bar'], function(cb) {cb();});
    from.task('default', ['baz'], function(cb) {cb();});

    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'undefined');
    assert.equal(typeof from.tasks['bar'], 'object');
    assert.equal(typeof to.tasks['bar'], 'undefined');
    assert.equal(typeof from.tasks['baz'], 'object');
    assert.equal(typeof to.tasks['baz'], 'undefined');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'undefined');

    copy(from, to, 'default');
    assert.equal(typeof from.tasks['foo'], 'object');
    assert.equal(typeof to.tasks['foo'], 'object');
    assert.equal(typeof from.tasks['bar'], 'object');
    assert.equal(typeof to.tasks['bar'], 'object');
    assert.equal(typeof from.tasks['baz'], 'object');
    assert.equal(typeof to.tasks['baz'], 'object');
    assert.equal(typeof from.tasks['default'], 'object');
    assert.equal(typeof to.tasks['default'], 'object');
    assert.deepEqual(to.tasks.default.deps, ['baz']);
    assert.deepEqual(to.tasks.baz.deps, ['bar']);
    assert.deepEqual(to.tasks.bar.deps, ['foo']);
    assert.deepEqual(to.tasks.foo.deps, []);
  });
});
