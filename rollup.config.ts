import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: `src/cli.ts`,
  output: [
    {
      file: pkg.main,
      name: 'cli',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    json({
      include: 'src/**',
      exclude: [ 'node_modules/**']
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    terser(),
    copy({ }),
  ],
};