module.exports = {
    // devServer:{
    //     proxy:{
    //         "/api":{
    //             target:"http://localhost:1001/api",
    //             ws:true,
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 "^/api":"/"
    //             }
    //         }
    //     }
    // }
    publicPath:"./",
    devServer: {
        proxy: {
          // detail: https://cli.vuejs.org/config/#devserver-proxy
          '/api': {
            target: `http://localhost:1001/api`,
            changeOrigin: true,
            pathRewrite: {
              '^/api' : ''
            }
          }
        }
    }

}