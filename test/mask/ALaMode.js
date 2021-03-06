// can't name this file ÀLaMode because it breaks debugging
// (source maps issue -- either VSCode / lib?)
import makeTestSuite from '@zoroaster/mask'
import { ÀLaMode } from '../../src/lib/transform'
import { runInNewContext } from 'vm'
import { collect } from 'catchment'

const ts = makeTestSuite('test/result/ÀLaMode.js', {
  getTransform() {
    const alamode = new ÀLaMode()
    return alamode
  },
})

const evaluate = makeTestSuite('test/result/evaluate', {
  async getResults() {
    const alamode = new ÀLaMode()
    alamode.end(this.input)
    const res = await collect(alamode)
    const sandbox = { require, test: {} }
    runInNewContext(res, sandbox)
    const { test } = sandbox
    return test
  },
  jsProps: ['expected'],
})

export { evaluate }
export default ts