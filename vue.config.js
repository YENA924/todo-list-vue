
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/css/main.scss";`
      }
    }
  },
  transpileDependencies: true
}
