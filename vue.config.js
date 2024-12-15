const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 关闭 eslint 校验
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_URL || 'http://127.0.0.1:82', // 使用环境变量
                changeOrigin: true, // 是否允许跨域
                // pathRewrite: {
                //     '^/api': '/api' // 重写
                // }
            }
        }
    },
})