// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild-wasm');

if (typeof window !== 'undefined') {
  esbuild.initialize({
    wasmURL: '/wasm/esbuild.wasm'
  });
}

export default esbuild;
