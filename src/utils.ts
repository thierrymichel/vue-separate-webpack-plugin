interface ILanguages {
  [key: string]: string[]
}

export const tags = ['template', 'script', 'style']
const [template, script, style] = tags
/**
 * Languages based on extension.
 * Describe `lang` attribute and `<tag>`.
 */
/* tslint:disable:object-literal-sort-keys */
export const languages: ILanguages = {
  // Templates
  html: ['', template],
  pug: ['pug', template],
  jade: ['jade', template],
  // Scripts
  js: ['', script],
  ts: ['', script],
  coffee: ['coffee', script],
  // Styles
  css: ['', style],
  scss: ['scss', style],
  sass: ['sass', style],
  less: ['less', style],
  styl: ['stylus', style],
  stylus: ['stylus', style]
}
/* tslint:enable:object-literal-sort-keys */

/**
 * Check if styles are scoped.
 */
export function isScoped(fileName: string) {
  return /\.scoped\./.test(fileName)
}

/**
 * Check if template is functional.
 */
export function isFunctional(fileName: string) {
  return /\.functional\./.test(fileName)
}
