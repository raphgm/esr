// Production entry point for hosting platforms (e.g. Hostinger) that
// look for `server.js` at the repo root. Delegates to the esbuild-bundled
// server produced by `npm run build`.
await import('./dist/server.cjs');
