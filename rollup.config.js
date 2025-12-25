import { nodeResolve } from '@rollup/plugin-node-resolve';

// 打包配置文件
export default {
    input: 'index.js',
    output: [
        {
            file: 'dist/main.cjs',
            format: 'cjs',
            exports: 'named'
        },
        {
            file: 'dist/main.mjs',
            format: 'esm',
            exports: 'named'
        },
        {
            file: 'dist/main.umd.js',
            format: 'umd',
            name: '@ashihachi/cgmath',
            exports: 'named'
        }
    ],
    plugins: [nodeResolve()]
}