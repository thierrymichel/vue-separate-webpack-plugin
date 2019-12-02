import compiler from './compiler'

const options = {
  root: '__fixtures__'
}

describe('defaults', () => {
  test('multiple', async () => {
    expect.assertions(3)

    try {
      await compiler('__fixtures__/basic.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<template.+basic\.vue\.html.+<\/template>$/m
      )
      expect(error.message).toMatch(/<script.+basic\.vue\.js.+<\/script>$/m)
      expect(error.message).toMatch(/<style.+basic\.vue\.css.+<\/style>$/m)
    }
  })

  test('options', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/basic.vue', {
        ...options,
        header: '/* eslint-disable */\n'
      })
    } catch (error) {
      expect(error.message).toMatch(/\/\* eslint-disable \*\/$/m)
    }
  })

  test('not found', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/notfound.vue', options)
    } catch (error) {
      expect(error.message).toMatch(/Entry module not found/)
    }
  })
})

describe('templates', () => {
  test('html', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-html.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<template.+template-html\.vue\.html.+<\/template>$/m
      )
    }
  })

  test('pug', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-pug.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<template.+template-pug\.vue\.pug.*lang="pug".+<\/template>$/m
      )
    }
  })

  test('jade', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-jade.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<template.+template-jade\.vue\.jade.*lang="jade".+<\/template>$/m
      )
    }
  })

  test('functional', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/template-functional.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<template.+template-functional\.vue\.functional\.html.*functional.+<\/template>$/m
      )
    }
  })
})

describe('scripts', () => {
  test('js', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-js.vue', options)
    } catch (error) {
      expect(error.message).toMatch(/<script.+script-js\.vue\.js.+<\/script>$/m)
    }
  })

  test('ts', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-ts.vue', options)
    } catch (error) {
      expect(error.message).toMatch(/<script.+script-ts\.vue\.ts.+<\/script>$/m)
    }
  })

  test('coffee', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/script-coffee.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<script.+script-coffee\.vue\.coffee.*lang="coffee".+<\/script>$/m
      )
    }
  })
})

describe('styles', () => {
  test('css', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-css.vue', options)
    } catch (error) {
      expect(error.message).toMatch(/<style.+style-css\.vue\.css.+<\/style>$/m)
    }
  })

  test('sass', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-sass.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-sass\.vue\.sass.*lang="sass".+<\/style>$/m
      )
    }
  })

  test('scss', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-scss.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-scss\.vue\.scss.*lang="scss".+<\/style>$/m
      )
    }
  })

  test('less', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-less.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-less\.vue\.less.*lang="less".+<\/style>$/m
      )
    }
  })

  test('styl', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-styl.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-styl\.vue\.styl.*lang="stylus".+<\/style>$/m
      )
    }
  })

  test('stylus', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-stylus.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-stylus\.vue\.stylus.*lang="stylus".+<\/style>$/m
      )
    }
  })

  test('scoped', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/style-scoped.vue', options)
    } catch (error) {
      expect(error.message).toMatch(
        /<style.+style-scoped\.vue\.scoped\.css.+<\/style>$/m
      )
    }
  })
})

describe('other', () => {
  test('custom blocks', async () => {
    expect.assertions(1)

    try {
      await compiler('__fixtures__/custom.vue', options)
    } catch (error) {
      expect(error.message).toMatch(/custom.*custom\.vue\.custom/)
    }
  })
})
