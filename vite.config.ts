import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'

import { author, homepage, license, name, version } from './package.json'

export default defineConfig((config) => {
  return {
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'hf',
      jsxInject: `import { h, hf } from "@reatom/jsx";`
    },
    plugins: [
      Userscript({
        fileName: name,
        entry: 'src/index.tsx',
        header: {
          name,
          version,
          author,
          license,
          homepage,
          match: ['http://localhost:3000', 'https://example.com']
        },
        server: {
          port: 3000
        }
      })

    ]
  }
})
