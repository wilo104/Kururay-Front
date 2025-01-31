
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 5878, hash: 'b6eb6f1c75c695e89c0b06c6cd3323fe888b7bb2f3a3026076041614425d69b0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1038, hash: '0e3b60cd94f43ae1b6decb507349311d0528a506dedb9f37c51a86a3e99a0ee3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-O3BQMZ6D.css': {size: 305732, hash: 'j0y1ZgcNuYQ', text: () => import('./assets-chunks/styles-O3BQMZ6D_css.mjs').then(m => m.default)}
  },
};
