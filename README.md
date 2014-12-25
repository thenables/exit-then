
# exit-then

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Execute promises before exiting a process.
Useful for cleaning up a process right before it quits.

## API

```js
var fns = require('exit-then');

fns.push(function () {
  return new Promise(function (resolve) {
    doSomethingAsync(function () {
      resolve();
    });
  });
});
```

[gitter-image]: https://badges.gitter.im/thenables/exit-then.png
[gitter-url]: https://gitter.im/thenables/exit-then
[npm-image]: https://img.shields.io/npm/v/exit-then.svg?style=flat-square
[npm-url]: https://npmjs.org/package/exit-then
[github-tag]: http://img.shields.io/github/tag/thenables/exit-then.svg?style=flat-square
[github-url]: https://github.com/thenables/exit-then/tags
[travis-image]: https://img.shields.io/travis/thenables/exit-then.svg?style=flat-square
[travis-url]: https://travis-ci.org/thenables/exit-then
[coveralls-image]: https://img.shields.io/coveralls/thenables/exit-then.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thenables/exit-then
[david-image]: http://img.shields.io/david/thenables/exit-then.svg?style=flat-square
[david-url]: https://david-dm.org/thenables/exit-then
[license-image]: http://img.shields.io/npm/l/exit-then.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/exit-then.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/exit-then
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
