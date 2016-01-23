# copy-task [![NPM version](https://img.shields.io/npm/v/copy-task.svg)](https://www.npmjs.com/package/copy-task)

> Copy a composer task and it's dependencies from one app to another.

## Install
Install with [npm](https://www.npmjs.com/):

```sh
$ npm i copy-task --save
```

## Usage

```js
var copy = require('copy-task');
```

## API

### [copy](index.js#L23)
Copy a task and it's dependencies from one app to another.


**Params**

* `from` **{Object}**: app to copy the task from    
* `to` **{Object}**: app to copy the task to    
* `name` **{String}**: name of task to copy    

**Example**



```js
copy(app1, app2, 'default');
```



## Related projects
* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [assemble-core](https://www.npmjs.com/package/assemble-core): The core assemble application with no presets or defaults. All configuration is left to the… [more](https://www.npmjs.com/package/assemble-core) | [homepage](https://github.com/assemble/assemble-core)
* [composer](https://www.npmjs.com/package/composer): API-first task runner with three methods: task, run and watch. | [homepage](https://github.com/jonschlinkert/composer)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [update](https://www.npmjs.com/package/update): Easily keep anything in your project up-to-date by installing the updaters you want to use… [more](https://www.npmjs.com/package/update) | [homepage](https://github.com/update/update)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Running tests
Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/copy-task/issues/new).

## Author
**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License
Copyright © 2016 [Brian Woodward](https://github.com/doowb)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on January 23, 2016._

[assemble]: https://github.com/assemble/assemble
[assemble-core]: https://github.com/assemble/assemble-core
[composer]: https://github.com/jonschlinkert/composer
[generate]: https://github.com/generate/generate
[update]: https://github.com/update/update
[verb]: https://github.com/verbose/verb
