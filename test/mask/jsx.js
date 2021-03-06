import makeTestSuite from '@zoroaster/mask'
import { resolve } from 'path'
import TempContext from 'temp-context'

/**
 * SSR JSX. This actually tests compiled version because
 * `test/fixture/require` points to the package's main field.
 */
export default makeTestSuite('test/result/jsx', {
  fork: {
    module: 'test/fixture/require',
    /**
     * @param {TempContext} t
     */
    async getOptions({ write }) {
      const p = await write('temp.jsx', this.input)
      return {
        env: {
          MODULE_PATH: resolve(p),
        },
      }
    },
    normaliseOutputs: true,
  },
  context: TempContext,
  jsProps: ['expected'],
})
