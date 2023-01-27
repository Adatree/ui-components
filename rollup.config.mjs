import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json' assert { type: 'json' };
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
    ],
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
      {
        file: 'storybook/src/lib/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
    external: (id) => /react|@mui|mdi-material-ui|axios|date-fns|url/.test(id),
  },
];
