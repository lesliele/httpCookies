var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 对请求类型做出解析
app.use(express.json());
var urlencodeds = bodyParser.urlencoded({
    extended: false
});
// 挂载中间件
app.use(urlencodeds);
// 加载cookie-parser模块
var cookieParser = require('cookie-parser');
// 挂载模块
app.use(cookieParser());

//需要安装并且引入中间件cors
const cors = require('cors');

var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    credentials: true,
    maxAge: '1728000'
    //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, x-header-f');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', '860000');
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-cache');
    res.header('Access-Control-Allow-Credentials', true);
    
    console.log(req.cookies);
    res.cookie('userinformation', '555', {
        // 设置该Cookie只可以由服务端访问，即前端JavaScript无法访问document.cookie获取该值，但控制台还是可以查看和修改
        httpOnly: false,
        domain: 'http://127.0.0.1:8080'
        // 只有通过HTTPS请求的Cookie才被使用，否则都认为是错误的Cookie
        // secure: true,
        // 设置保存Cookie的域名，浏览器查找Cookie时，子域名（如translate.google.com）可以访问主域名（google.com）下的Cookie，而主域名（google.com）不可以访问子域名（如translate.google.com）下的Cookie
        // 本地测试可直接设置为localhost
        // 通过expires设置Cookie过期时间为14天后
        // expires: new Date(new Date().getTime() + 14 * 86400000),
        // 通过maxAge设置Cookie过期时间为14天后
    })

    // if (req.method == 'OPTIONS') {
    //     res.send(200);
    //     /让options请求快速返回/
    // } else {
    //     next();
    // }
    next();
});
app.use('/api', require('./routers/api'));
app.listen(9017, function () {
    console.log('端口开启')
});