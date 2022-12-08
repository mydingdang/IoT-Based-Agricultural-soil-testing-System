const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    name:String,
    status: String,
    type: String,
    data: String,
    isNormal:Boolean
})

module.exports = mongoose.model('sensors', sensorSchema)