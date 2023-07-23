const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //关闭eslint校验
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:82',//后端接口地址
                changeOrigin: true,//是否允许跨越
                // pathRewrite: {
                //     '^/api': '/api'//重写,
                // }
            }
        }
    },
})
