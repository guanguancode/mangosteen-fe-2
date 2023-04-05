module.exports={
    // 指定服务器模块
    devServer:{
        // 代理
        proxy:{
            '/v1/api':{
                // 目标地址
                target:'http://localhost:3000',
                changeOrigin:true,
                pathRewrite:{
                    '/v1/api':'/api'
                }
            }
        }
    }
}