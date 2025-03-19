import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.mjs',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'lib/index.cjs',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
      browser: true // Ensure browser-compatible modules are resolved
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx']
    })
  ],
  external: ['react', 'react-dom'] // Ensure Node.js modules are not bundled
};