module.exports = {
  devServer: {
    port: 8080,
    https: false,
    hotOnly: false,
  },

  outputDir: process.env.NODE_ENV === 'production' ? './dist' : './dist-dev',

  pluginOptions: {
    i18n: {
      locale: 'pt_br',
      fallbackLocale: 'pt_br',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },

  pwa: {
    name: 'Savecash Cliente',
    assetsVersion: '1.0',
  },
};
