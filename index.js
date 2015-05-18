'use strict'

/**
 * Don't allow multiple copies of this module
 * because that would mess everything up.
 */

if (global.EXIT_THEN_1) {
  console.error('Another copy of `exit-then` was found. Please `npm dedupe`.')
  module.exports = global.EXIT_THEN_1
  return
}

const Promise = require('native-or-bluebird')
const timeout = require('timeout-then')
const onExit = require('signal-exit')

const fns = module.exports = []

/**
 * Make a global version based on version.
 */

global.EXIT_THEN_1 = {
  fns: fns,
  onexit: onexit
}

/**
 * Custom minimum timeout interval.
 */

const EXIT_TIMEOUT = parseInt(process.env.EXIT_TIMEOUT, 0) || 0
if (EXIT_TIMEOUT) fns.push(function () {
  return timeout(EXIT_TIMEOUT)
})

onExit(onexit)
process.on('uncaughtException', function (err) {
  console.error(err.stack)
  onexit(err)
})

let exited = false
function onexit(err) {
  if (exited) return
  exited = true
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
