const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'));
    },
    devServer: {
        proxy: 'http://127.0.0.1:5000'
    }
};
