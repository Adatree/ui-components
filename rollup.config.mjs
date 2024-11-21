import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json' with { type: 'json' };
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript(),
      postcss({
        plugins: [],
      }),
      nodeResolve(),
      nodePolyfills(),
    ],
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
      {
        file: 'storybook_8/src/lib/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
    external: (id) => /react|@emotion|@mui|mdi-material-ui|axios|date-fns/.test(id),
  },
];
