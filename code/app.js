
const bodyParser = require('body-parser')
//1.引入express模块
const express = require('express')
//2.创建app对象
const app = express()

const sensor = require('./router/sensor')
//定义简单路由

// app.use('/',(req,res) => {
//     res.send('Yo!')
//   })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))  
app.use('/api',sensor)

//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})
