const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'node_modules', '@rollup', 'wasm-node', 'dist');
const destDir = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist');

try {
  if (fs.existsSync(srcDir) && fs.existsSync(destDir)) {
    const wasmSrc = path.join(srcDir, 'wasm-node');
    const wasmDest = path.join(destDir, 'wasm-node');
    if (fs.existsSync(wasmSrc)) {
      fs.cpSync(wasmSrc, wasmDest, { recursive: true, force: true });
    }
    const nativeSrc = path.join(srcDir, 'native.js');
    const nativeDest = path.join(destDir, 'native.js');
    if (fs.existsSync(nativeSrc)) {
      fs.copyFileSync(nativeSrc, nativeDest);
    }
  }
} catch (e) {
  // Silent fallback if postinstall fails in non-msvc environments
}
