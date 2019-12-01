import fs from 'fs'
import junk from 'junk'
import path from 'path'
import * as utils from './utils'
import { writeVirtualFile } from './virtualFile'
import { VirtualStats } from './virtualStats'

let inode = 45000000

/**
 * Plugin
 */
// https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
export class VueSeparatePlugin {
  private root: string
  private source: string
  private target: string

  /* istanbul ignore next */
  constructor({
    root = 'src',
    source = 'file',
    target = 'existing-file'
  } = {}) {
    this.root = root
    this.source = source
    this.target = target
  }

  public apply(resolver: any) {
    const target = resolver.ensureHook(this.target)

    // Allow webpack to write our virtual .vue modules.
    resolver.fileSystem._writeVirtualFile = writeVirtualFile
    // Hook.
    resolver
      .getHook(this.source)
      .tapAsync(
        'vue-separate-plugin',
        (params: any, resolveContext: any, callback: any) => {
          const { path: filePath } = params

          // Process only "resolvable" files.
          if (this.isValid(filePath)) {
            const files = this.getSources(filePath)

            // Process `name.vue[.attribute].ext` files
            if (files.length > 0) {
              const content = this.createContent(files)
              const stats = this.createStats(content)

              // Write virtual module.
              resolver.fileSystem._writeVirtualFile(
                resolver.fileSystem,
                filePath,
                stats,
                content
              )
              resolver.doResolve(target, params, null, resolveContext, callback)
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      )
  }

  /**
   * Check validity before virtual resolution
   *
   * 1. File should be located inside 'root/src' folder
   * 2. File should be a "real" .vue
   *    not a .vue.xxx trying to be resolved as .vue.xxx.vue
   */
  private isValid(filePath: string) {
    const rootMatch = new RegExp(`/${this.root}/`)

    return (
      rootMatch.test(filePath) &&
      /\.vue$/.test(filePath) &&
      !/\.vue\..+\.vue$/.test(filePath)
    )
  }

  /**
   * Get all `name.vue[.attribute].ext` files
   */
  private getSources(filePath: string) {
    const dir = path.dirname(filePath)
    const files = fs.readdirSync(dir)

    return files
      .filter(file => {
        const ext = path.extname(file).replace(/^\./, '')
        // Check for [module.vue][.attribute[s]].extension
        const match = new RegExp(`${path.basename(filePath)}.*\\.${ext}$`)

        return junk.not(file) && match.test(file)
      })
      .map(file => path.join(dir, file))
  }

  /**
   * Create content for SFC with `<tag src=""></tag>`
   */
  private createContent(files: string[]) {
    let content = '/* eslint-disable */\n'

    content += files
      // Create file content.
      .map(file => {
        const ext = path.extname(file).replace(/^\./, '')
        const [language, tag] = utils.languages[ext]
          ? utils.languages[ext]
          : [ext, ext]
        // Attributes.
        const lang = language ? ` lang="${language}"` : ''
        const scoped = utils.isScoped(file) ? ' scoped' : ''
        const functional = utils.isFunctional(file) ? ' functional' : ''

        return {
          content: `<${tag} src="${file}"${lang}${scoped}${functional}></${tag}>\n`,
          name: tag
        }
      })
      // Order by tag.
      .sort((a, b) => {
        const i = utils.tags.indexOf(a.name)
        const j = utils.tags.indexOf(b.name)

        return i - j
      })
      // Get the content.
      .map(element => element.content)
      // As a string.
      .join('')

    return content
  }

  /**
   * Create stats for virtual file content
   */
  private createStats(content: string) {
    // Never empty…
    // const len = content ? content.length : 0
    const len = content.length
    const time = Date.now()
    const date = new Date(time)

    /* tslint:disable:object-literal-sort-keys */
    return new VirtualStats({
      dev: 8675309,
      nlink: 0,
      uid: 1000,
      gid: 1000,
      rdev: 0,
      blksize: 4096,
      ino: inode++,
      mode: 33188,
      size: len,
      blocks: Math.floor(len / 4096),
      atime: date,
      mtime: date,
      ctime: date,
      birthtime: date
    })
    /* tslint:enable:object-literal-sort-keys */
  }
}
