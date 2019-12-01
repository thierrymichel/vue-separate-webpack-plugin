import compiler from './compiler'

describe('defaults', () => {
  test('multiple', async () => {
    expect.assertions(3)

    try {
      await compiler('__fixtures__/basic.vue')
    } catch (error) {
      expect(error.message).toMatch(/template.*basic\.vue\.html/)
      expect(error.message).toMatch(/script.*basic\.vue\.js/)
      expect(error.message).toMatch(/style.*basic\.vue\.css/)
    }
  })

  test('not found', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/notfound.vue')
    } catch (error) {
      expect(error.message).toMatch(/Entry module not found/)
    }
  })
})

describe('templates', () => {
  test('html', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-html.vue')
    } catch (error) {
      expect(error.message).toMatch(/template.*template-html\.vue\.html/)
    }
  })

  test('pug', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-pug.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /template.*template-pug\.vue\.pug.*lang="pug"/
      )
    }
  })

  test('jade', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-jade.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /template.*template-jade\.vue\.jade.*lang="jade"/
      )
    }
  })

  test('functional', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-functional.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /template.*template-functional\.vue\.functional\.html.*functional/
      )
    }
  })
})

describe('scripts', () => {
  test('js', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-js.vue')
    } catch (error) {
      expect(error.message).toMatch(/script.*script-js\.vue\.js/)
    }
  })

  test('ts', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-ts.vue')
    } catch (error) {
      expect(error.message).toMatch(/script.*script-ts\.vue\.ts/)
    }
  })

  test('coffee', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-coffee.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /script.*script-coffee\.vue\.coffee.*lang="coffee"/
      )
    }
  })
})

describe('styles', () => {
  test('css', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-css.vue')
    } catch (error) {
      expect(error.message).toMatch(/style.*style-css\.vue\.css/)
    }
  })

  test('sass', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-sass.vue')
    } catch (error) {
      expect(error.message).toMatch(/style.*style-sass\.vue\.sass.*lang="sass"/)
    }
  })

  test('scss', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-scss.vue')
    } catch (error) {
      expect(error.message).toMatch(/style.*style-scss\.vue\.scss.*lang="scss"/)
    }
  })

  test('less', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-less.vue')
    } catch (error) {
      expect(error.message).toMatch(/style.*style-less\.vue\.less.*lang="less"/)
    }
  })

  test('styl', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-styl.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /style.*style-styl\.vue\.styl.*lang="stylus"/
      )
    }
  })

  test('stylus', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-stylus.vue')
    } catch (error) {
      expect(error.message).toMatch(
        /style.*style-stylus\.vue\.stylus.*lang="stylus"/
      )
    }
  })

  test('scoped', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-scoped.vue')
    } catch (error) {
      expect(error.message).toMatch(/style.*style-scoped\.vue\.scoped\.css/)
    }
  })
})

describe('other', () => {
  test('custom blocks', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/custom.vue')
    } catch (error) {
      expect(error.message).toMatch(/custom.*custom\.vue\.custom/)
    }
  })
})
