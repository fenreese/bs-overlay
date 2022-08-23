import { defineConfig } from 'vite';
import path from 'path';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { minify } from 'html-minifier';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ],
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ]
  },
  plugins: [
    viteCommonjs(),
    htmlMinify(),
  ],
  build: {
    rollupOptions: {}
  }
})

const htmlComponentFile = /\.component\.html\?inline$/;

const minifyHTMLConfig = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

function htmlMinify() {
  return {
    name: 'html-minify',

    transform(src: string, id: string) {
      if (htmlComponentFile.test(id)) {
        return {
          code: `export default \`${minify(src, minifyHTMLConfig)}\``,
          map: null,
        };
      } else {
        return;
      }
    },
  };
}
