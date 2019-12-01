import memoryfs from 'memory-fs'
import path from 'path'
import webpack from 'webpack'
import Plugin from '../src'

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `../${fixture}`,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname)
    },
    resolve: {
      plugins: [
        new Plugin({
          root: '__fixtures__'
        })
      ]
    }
  })

  compiler.outputFileSystem = new memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
      }
      if (stats.hasErrors()) {
        reject(new Error((stats.toJson().errors as any) as string))
      }

      resolve({
        compiler,
        stats
      })
    })
  })
}
