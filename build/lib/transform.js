const { Replaceable } = require('restream');
let makeRules = require('@a-la/markers'); if (makeRules && makeRules.__esModule) makeRules = makeRules.default;
let ALaImport = require('@a-la/import'); if (ALaImport && ALaImport.__esModule) ALaImport = ALaImport.default;
let ALaExport = require('@a-la/export'); if (ALaExport && ALaExport.__esModule) ALaExport = ALaExport.default;
let whichStream = require('which-stream'); if (whichStream && whichStream.__esModule) whichStream = whichStream.default;
let Catchment = require('catchment'); if (Catchment && Catchment.__esModule) Catchment = Catchment.default;
const { createReadStream } = require('fs');
const { basename, dirname, join } = require('path');
const { getMap } = require('./source-map');

const getConfig = () => {
  let config = {}
  try {
    const r = join(process.cwd(), '.alamoderc.json')
    config = require(r)
  } catch (err) { /* no config */ }
  const { env: { ALAMODE_ENV } } = process
  const c = config.env && ALAMODE_ENV in config.env ? config.env[ALAMODE_ENV] : config

  delete c.env

  return c
}


const makeReplaceable = () => {
  const config = getConfig()
  const { rules, markers } = makeRules([
    ...ALaImport,
    ...ALaExport,
  ])
  const replaceable = new Replaceable(rules)
  replaceable.markers = markers

  replaceable.config = config
  return replaceable
}

/**
 * Run a transform stream.
 */
       const transformStream = async ({
  source,
  destination,
  writable,
}) => {
  const replaceable = makeReplaceable()

  const readable = createReadStream(source)

  readable.pipe(replaceable)
  const { promise: sourcePromise } = new Catchment({ rs: readable })

  const [,, sourceCode] = await Promise.all([
    whichStream({
      source,
      ...(writable ? { writable } : { destination }),
      readable: replaceable,
    }),
    new Promise((r, j) => {
      replaceable.once('error', j)
      replaceable.once('end', r)
    }),
    sourcePromise,
  ])

  return sourceCode
}

class Context {
  constructor(markers) {
    this.listeners = {}
    this.markers = markers
    this.config = getConfig()
  }
  on(event, listener) {
    this.listeners[event] = listener
  }
  emit(event, data) {
    this.listeners[event](data)
  }
}

/**
 * @param {string} source Source code as a string.
 */
       const syncTransform = (source, filename) => {
  const { rules, markers } = makeRules([
    ...ALaImport,
    ...ALaExport,
  ])
  const context = new Context(markers)

  const replaced = rules.reduce((acc, { re, replacement }) => {
    const newAcc = acc.replace(re, replacement.bind(context))
    return newAcc
  }, source)

  const file = basename(filename)
  const sourceRoot = dirname(filename)
  const map = getMap({
    originalSource: source,
    pathToSrc: file,
    sourceRoot,
  })
  const b64 = Buffer.from(map).toString('base64')
  const s = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${b64}`

  const code = `${replaced}\n${s}`

  return code
}

module.exports.transformStream = transformStream
module.exports.syncTransform = syncTransform
//# sourceMappingURL=transform.js.map