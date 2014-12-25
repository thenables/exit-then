
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
var timeout = require('timeout-then')

var fns = module.exports = []

/**
 * Custom minimum timeout interval.
 */

var EXIT_TIMEOUT = parseInt(process.env.EXIT_TIMEOUT, 0) || 0
if (EXIT_TIMEOUT) fns.push(function () {
  return timeout(EXIT_TIMEOUT)
})

process.on('SIGINT', onexit)
process.on('SIGTERM', onexit)
process.on('uncaughtException', function (err) {
  console.error(err.stack)
  onexit(err)
})

function onexit(err) {
  if (!(err instanceof Error)) err = null
  Promise.all(fns.map(function (fn) {
    return fn(err)
  })).then(function () {
    process.exit(0)
  }).catch(function (err) {
    console.error(err.stack)
    process.exit(1)
  })
}
