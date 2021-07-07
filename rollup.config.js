import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

import packageJSON from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    external(),
    postcss({
      extract: false,
      modules: true,
      use: {
        sass: {
          data: '@import "./src/index.scss";',
        },
      },
    }),
    typescript({ objectHashIgnoreUnknownHack: true, exclude: 'node_modules/**' }),
  ],
  external: [packageJSON.peerDependencies || {}],
};
