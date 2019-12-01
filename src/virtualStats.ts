/**
 * Used to cache a stats object for the virtual file.
 * Extracted from the `mock-fs` package.
 *
 * @author Tim Schaub http://tschaub.net/
 * @link https://github.com/tschaub/mock-fs/blob/master/lib/binding.js
 * @link https://github.com/tschaub/mock-fs/blob/master/license.md
 */

import fs from 'fs'

/**
 * Create a new stats object.
 */
export class VirtualStats {
  [key: string]: any

  constructor(config: any) {
    for (const key in config) {
      if (!config.hasOwnProperty(key)) {
        continue
      }
      this[key] = config[key]
    }
  }

  /**
   * Check if is a directory.
   */
  public isDirectory() {
    return this._checkModeProperty(fs.constants.S_IFDIR)
  }

  /**
   * Check if is a regular file.
   */
  public isFile() {
    return this._checkModeProperty(fs.constants.S_IFREG)
  }

  /**
   * Check if is a block device.
   */
  public isBlockDevice() {
    return this._checkModeProperty(fs.constants.S_IFBLK)
  }

  /**
   * Check if is a character device.
   */
  public isCharacterDevice() {
    return this._checkModeProperty(fs.constants.S_IFCHR)
  }

  /**
   * Check if is a symbolic link.
   */
  public isSymbolicLink() {
    return this._checkModeProperty(fs.constants.S_IFLNK)
  }

  /**
   * Check if is a named pipe.
   */
  public isFIFO() {
    return this._checkModeProperty(fs.constants.S_IFIFO)
  }

  /**
   * Check if is a socket.
   */
  public isSocket() {
    return this._checkModeProperty(fs.constants.S_IFSOCK)
  }

  /**
   * Check if mode indicates property.
   */
  private _checkModeProperty(property: number) {
    // tslint:disable-next-line:no-bitwise
    return (this.mode & fs.constants.S_IFMT) === property
  }
}
