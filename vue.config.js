// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm-bundler.js'
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = JSON.stringify(false);
      return args;
    });
  }
};
