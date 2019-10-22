import { Replaceable } from 'restream'
import makeRules from '@a-la/markers'
import ALaImport from '@a-la/import'
import ALaExport from '@a-la/export'
import whichStream from 'which-stream'
import { read } from '@wrote/wrote'
import { basename, dirname } from 'path'
import { getMap } from './source-map'
import { getConfig } from './'

const getRules = () => {
  const r = [
    ...ALaImport,
    ...ALaExport,
  ]
  const { rules, markers } = makeRules(r)
  return { rules, markers }
}

/**
 * The class to hold markers and config.
 * @implements {_alamode.ÀLaMode}
 */
export class ÀLaMode extends Replaceable {
  /**
   * @param {string} file
   */
  constructor(file) {
    const config = getConfig()
    const { rules, markers } = getRules()
    super(rules)

    this.markers = markers
    this.config = config
    this.file = file
    this.noSourceMaps = false
    this.async = true
  }
}

/**
 * Run a transform stream, and return the source code that was transformed.
 */
export const transformStream = async ({
  source,
  destination,
  writable,
  debug,
  noSourceMaps,
}) => {
  const alamode = new ÀLaMode(source)
  if (noSourceMaps) alamode.noSourceMaps = noSourceMaps
  if (debug) alamode['stopProcessing'] = true

  const sourceCode = await read(source)
  alamode.end(sourceCode)

  await Promise.all([
    whichStream({
      source,
      ...(writable ? { writable } : { destination }),
      readable: alamode,
    }),
    new Promise((r, j) => alamode.on('finish', r).on('error', j)),
  ])
  return sourceCode
}

class Context {
  constructor(config, markers, filename) {
    this.listeners = {}
    this.markers = markers
    this.config = config
    this.file = filename
  }
  on(event, listener) {
    this.listeners[event] = listener
  }
  emit(event, data) {
    this.listeners[event](data)
  }
}

export const transformString = (source, filename) => {
  const config = getConfig()
  const { rules, markers } = getRules()
  const context = new Context(config, markers, filename)

  const replaced = rules.reduce((acc, { re, replacement }) => {
    const newAcc = acc.replace(re, replacement.bind(context))
    return newAcc
  }, source)
  return replaced
}

/**
 * Transforms the code synchronously. Used in the `require` hook.
 * @param {string} source Source code as a string.
 * @param {string} filename The file name of the source.
 * @param {boolean} [noMap] Do not create source maps (used for JSX).
 */
export const syncTransform = (source, filename, noMap = false) => {
  const replaced = transformString(source, filename)
  if (noMap) return replaced
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

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').ÀLaMode} _alamode.ÀLaMode
 */