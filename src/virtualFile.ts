/**
 * Used to create a virtual file using webpack compiler file system.
 * Extracted from the `mock-fs` package.
 *
 * @author SysGears INC. https://sysgears.com/
 * @link https://github.com/sysgears/webpack-virtual-modules/blob/master/index.js
 * @link https://github.com/sysgears/webpack-virtual-modules/blob/master/LICENSE
 */

import path from 'path'
import { VirtualStats } from './virtualStats'

interface IGenericObject {
  [key: string]: string
}

interface IStorage {
  data: Map<string, any> | IGenericObject
}

let inode = 45000000

function getData(storage: IStorage, key: string) {
  if (storage.data instanceof Map) {
    return storage.data.get(key)
  } else {
    return storage.data[key]
  }
}

function setData(storage: IStorage, key: string, value: any) {
  if (storage.data instanceof Map) {
    storage.data.set(key, value)
  } else {
    storage.data[key] = value
  }
}

export function writeVirtualFile(
  fs: any,
  file: string,
  stats: VirtualStats,
  content: string
) {
  setData(fs._statStorage, file, [null, stats])
  setData(fs._readFileStorage, file, [null, content])

  const segments = file.split(/[\\/]/)
  let count = segments.length - 1
  const minCount = segments[0] ? 1 : 0

  while (count > minCount) {
    const dir = segments.slice(0, count).join(path.sep) || path.sep

    try {
      fs.readdirSync(dir)
    } catch (e) {
      const time = Date.now()
      /* tslint:disable:object-literal-sort-keys */
      const dirStats = new VirtualStats({
        dev: 8675309,
        nlink: 0,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: inode++,
        mode: 16877,
        size: stats.size,
        blocks: Math.floor(stats.size / 4096),
        atime: time,
        mtime: time,
        ctime: time,
        birthtime: time
      })
      /* tslint:enable:object-literal-sort-keys */
      setData(fs._readdirStorage, dir, [null, []])
      setData(fs._statStorage, dir, [null, dirStats])
    }

    const dirData = getData(fs._readdirStorage, dir)
    const filename = segments[count]

    if (dirData[1].indexOf(filename) < 0) {
      const files = dirData[1].concat([filename]).sort()
      setData(fs._readdirStorage, dir, [null, files])
    } else {
      break
    }

    count--
  }
}
