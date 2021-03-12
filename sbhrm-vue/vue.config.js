let proxyObj = {};
proxyObj['/hr'] = {
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true
}
proxyObj['/login_process'] = {
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true
}
proxyObj['/logout'] = {
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}