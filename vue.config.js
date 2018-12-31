module.exports = {
  devServer: {
    // PROXY EXAMPLE
    proxy: {
      // API for firebase functions
      // "/bitmex/API": {
      //   target: "https://firebase functions",
      //   pathRewrite: { "^/API": "/api/v1" }
      // }
    // }
  },
  pwa: {
    name: "Vue Boilerplate",
    themeColor: "#303030",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",


    favicon32: "img/icons/favicon-32x32.png",
    favicon16: "img/icons/favicon-16x16.png",
    appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
    maskIcon: "img/icons/safari-pinned-tab.svg",
    msTileImage: "img/icons/msapplication-icon-144x144.png"
    // configure the workbox plugin
    // workboxPluginMode: "InjectManifest",
    // workboxOptions: {
    // swSrc is required in InjectManifest mode.
    // swSrc: "dev/sw.js"
    // ...other Workbox options...
    // }
  }
};
