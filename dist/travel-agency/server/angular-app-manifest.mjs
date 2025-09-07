
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-OMX33BE7.js",
      "chunk-OTLASCRE.js",
      "chunk-YYNUCPIP.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NOBL23YU.js",
      "chunk-OTLASCRE.js",
      "chunk-UCK5YZBM.js"
    ],
    "route": "/destinations"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-EJLPWGKJ.js"
    ],
    "route": "/tours"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XWPW4OYH.js",
      "chunk-YYNUCPIP.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FTXOVXFH.js",
      "chunk-UCK5YZBM.js"
    ],
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 39214, hash: 'c8157a2567579f7cf4cac859b0d8d08cd82aba3bba2e1e66eddb2f6f614a5584', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 31175, hash: '0d129160cc1b5ea70bec922195726c92216564a4db1d2c9da05d6bc6e93047fe', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'destinations/index.html': {size: 127180, hash: 'aa7a348c669c5bdf69763d7869f0e8d87caab4d140c424be39c387f628209f99', text: () => import('./assets-chunks/destinations_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 123549, hash: 'b5e200030f0750d774e9498685f06401ad8cafb3adafadf2ec400a6e3a0c279c', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'tours/index.html': {size: 118852, hash: '3df3827092586dd4fbdc04ecbe17a51f97388c40ece42f737f9ae1ce54ab3cba', text: () => import('./assets-chunks/tours_index_html.mjs').then(m => m.default)},
    'index.html': {size: 223211, hash: 'f379a309b1b42e3cf4d9bb96f901188d6c56884b248657024cdca5be072d0247', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 106970, hash: 'f2675c30763be59d0168e5d72d86267228a3d20a7ff8351d9c7cf2f43340837d', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-Q47BUJ5F.css': {size: 84256, hash: 'kBBpt2DyFaI', text: () => import('./assets-chunks/styles-Q47BUJ5F_css.mjs').then(m => m.default)}
  },
};
