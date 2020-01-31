const mongoose = require("mongoose")
const Koa = require("koa")
const app = new Koa()
const Router = require("koa-router")
const router = new Router()
const path = require("path")
const static = require("koa-static")
const render = require("koa-ejs")
const {showIndex,showAdd,saveStudent,removeStudent,deleteStudent,change,end,updateStudent,checkStudent} = require("./router/showIndex")
const bodyparser =require("koa-bodyparser")

app.use(bodyparser())
app.use(router.routes())//路由配置

app.use(static("./pubilc"))//自动为public目录中的资源设置路
render(app,{//koa-ejs的默认配置
    root:path.join(__dirname,"view"),
    layout:"template",
    viewExt:"html"
})
router.get("/",showIndex)//根路由
router.get("/addStudent",showAdd)//添加学生路由
router.post("/addStudent",saveStudent)
router.get("/removeStudent",removeStudent)
router.post("/removeStudent",deleteStudent)
router.get("/updateStudent",updateStudent)
router.post("/updateStudent",change)
router.get("/checkStudent",checkStudent)
router.post("/checkStudent",end)
mongoose.connect("mongodb://localhost:27017/students",{//连接数据库
    useNewUrlParser:true,//默认两条配置
	useUnifiedTopology:true
}).then(()=>{
    console.log("数据库连接成功");
    app.listen(3000,(cxt)=>{//监听3000端口
        
    })
}).catch(()=>{
    console.log("数据库连接失败")
})