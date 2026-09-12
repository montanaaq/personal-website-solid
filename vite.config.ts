import path from 'node:path'
import solid from 'vite-plugin-solid'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
  fmt: {
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    trailingComma: 'none',
    semi: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    printWidth: 100,
    sortPackageJson: false,
    ignorePatterns: [],
    sortImports: {
      newlinesBetween: true,
      ignoreCase: true,
      internalPattern: ['@/**'],
      groups: [
        'type-import',
        ['value-builtin', 'value-external'],
        'value-internal',
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown'
      ]
    }
  },
  lint: {
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error'
    },
    options: {
      typeAware: true,
      typeCheck: true
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ]
  },
  plugins: lazyPlugins(() => [solid()]),
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  }
})
