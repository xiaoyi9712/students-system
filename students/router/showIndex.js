const Student = require("../models/studentSchema")
console.log(Student)
exports.showIndex = async function(cxt){//首页
    const result = await Student.find()//find是一台promise机器要用await
    await  cxt.render("index",{result})//render是台promise机器要用await
    
}
exports.showAdd = async function(cxt){//添加页
    await cxt.render("showAdd")
}
exports.saveStudent = async function(cxt){//把前端的数据保存到数据库中
    //获取前端的数据
    const {students,sex,chinese,math,english} = cxt.request.body

    //查询数据库有没有这个人的名字,如果没有就保存,有就不保存
    const result = await Student.find({Name:students})
    if(!result.length){
        Student.create({
            Name:students,
            Sex:sex,
            Chinese:chinese,
            Math:math,
            English:english
        })
        cxt.body = "添加学生成功"
    }else{
        cxt.body = "不能添加重复的学生"
    }
   
}

exports.removeStudent = async function(cxt){//删除页面的显示
    await cxt.render("removeStudent")
}
exports.deleteStudent = async function(cxt){//把前端的删除数据做处理
    const {Value} = cxt.request.body//获取前端的数据
    const removeValue = await Student.find({Name:Value})//在数据库中查找有没有该数据
    if(removeValue.length){
       await Student.deleteMany(removeValue[0])
        cxt.body = "你已成功删除该数据!"
    }else{
        cxt.body = "没有该学生数据!"
    }
}
exports.updateStudent = async cxt=>{//渲染到页面
    await cxt.render("upup")
}
exports.change = async cxt=>{//修改数据
    const {students} = cxt.request.body
    const result = await Student.findOne({Name:students})
    if(result){
        await Student.updateOne({Name:students},{$set:cxt.request.body})//有改,名叫students的,改所有属性除名字属性
        // console.log(cxt.request.body)
        cxt.body = "修改成功!"
    }else{
        cxt.body = "没有这个人!"
    }
}
exports.checkStudent = async cxt=>{//渲染页面
    await cxt.render("last")
}
exports.end = async cxt=>{//数据处理
    const {data} = cxt.request.body//得到数据
    let demo = await Student.findOne({Name:data})//数据库查找数据
    if(demo){//判断数据库有没有该数据,并做出相应的返回
        cxt.body = `${demo.Name}`
    }else{
        cxt.body = "对不起,系统没得这个人"
    }
}