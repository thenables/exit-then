
/**
 * Don't allow multiple copies of this module
 * because that would mess everything up.
 */

if (global.EXIT_THEN_1) {
  console.error('Another copy of `exit-then` was found. Please `npm dedupe`.')
  module.exports = global.EXIT_THEN_1
  return
}

var Promise = require('native-or-bluebird')

var fns = module.exports = []

process.on('SIGINT', onexit)
process.on('SIGTERM', onexit)
process.on('uncaughtException', function (err) {
  console.error(err.stack)
  onexit(err)
})

function onexit(err) {
  if (!(err instanceof Error)) err = null
  Promise.all(fns.map(function (fn) {
    fn(err)
  })).then(function () {
    process.exit(0)
  }).catch(function (err) {
    console.error(err.stack)
    process.exit(1)
  })
}
