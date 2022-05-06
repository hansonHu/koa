const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: 'http://172.16.3.17:8500/' //服务器域名，80端口是默认的，可以不用配置
    }
})