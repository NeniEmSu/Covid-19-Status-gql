
export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/41fc25a21c.js'
      }
    ]
  },

  loading: { color: '#fff' },

  css: [
    'normalize-scss/sass/_normalize.scss'
  ],

  plugins: [
  ],

  buildModules: [

    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],

  modules: [
    'vue-scrollto/nuxt',
    '@nuxtjs/apollo',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],

  apollo: {
    includeNodeModules: true,
    errorHandler: '~/apollo/customErrorHandler',
    clientConfigs: {
      default: '~/apollo/clientConfig.js'
    }
  },

  axios: {
  },

  build: {

    extend (config, ctx) {
    }
  }
}
