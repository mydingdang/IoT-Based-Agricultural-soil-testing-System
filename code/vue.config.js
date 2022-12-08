const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/IoT-Devices/' : '/',
  devServer : {
    proxy:{
      '/api':{
        target: 'http://localhost:3000',
        changOrigin: true
      }  
    }  
  }
})
