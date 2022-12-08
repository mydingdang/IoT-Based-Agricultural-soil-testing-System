//引入express模块
const express = require('express');
//定义路由级中间件
const router = express.Router();

const mongoose = require('mongoose');

//引入数据模型模块
const Sensor = require("../models/sensor");


mongoose.connect('mongodb://localhost:27017/IoT-devices');
mongoose.connection.on('connected',()=>{
 console.log("mongoDB连接成功");
});
mongoose.connection.on('erroe',()=>{
 console.log("mongoDB连接出错");
});
mongoose.connection.on('disconnected',()=>{
 console.log("mongoDB断开连接");
});

router.get('/',(req,res,next)=>{
  //利用goods模板调用mongooseAPI进行数据库查询
  Sensor.find({})
    .sort({ update_at: -1 })
    .then(sensors => {
      res.json(sensors);
    })
    .catch(err => {
      console.log(2);
      res.json(err);
    });

 });

// 添加传感器信息路由
router.post("/", (req, res,next) => {
  //使用model上的create方法储存数据
  Sensor.create(req.body, (err, sensor) => {
    console.log('req.body', req.body)
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

//更新一条传感器信息数据路由
router.put("/:id", (req, res) => {
  Sensor.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        status: req.body.status,
        data: req.body.data,
        isNormal: req.body.isNormal,
      }
    },
    {
      new: true
    }
  )
    .then(sensor => res.json(sensor))
    .catch(err => res.json(err));
});


//删除一条传感器信息路由
router.delete("/", (req, res) => {
  Sensor.findOneAndRemove({
    name: req.body.name,
    type: req.body.type
  })
    .then(sensor => res.send(`${req.body.name} delete success`))
    .catch(err => res.json(err));
});

module.exports = router;
