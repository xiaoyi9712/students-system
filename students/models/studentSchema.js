const mongoose = require("mongoose")
let studentSchema = new mongoose.Schema({//设置数据格式
	Name:String,
	Sex:String,
    Chinese:Number,
    Math:Number,
    English:Number
    })
module.exports = mongoose.model("banji121",studentSchema)//给banji121设置studentSchema数据格式并导出
