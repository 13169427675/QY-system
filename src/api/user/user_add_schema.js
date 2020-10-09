//新增用户规则
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/QY_System",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("用户列表连接数据库成功");
}).catch((err)=>{
    console.log("用户列表连接数据库失败",err);
})
let schema = mongoose.Schema;
let userlist = new schema({
    //登录的用户名
    user:{
        required:true,
        type:String
    },
    //登录后的昵称
    username:{
        required:true,
        type:String
    },
    //密码1
    password1:{
        required:true,
        type:String
    },
    //密码2
    password2:{
        required:true,
        type:String
    },
    //电话号码
    tel:{
        required:true,
        type:String
    },
    //电子邮件
    email:{
        required:true,
        type:String
    },
    //真实姓名
    name:{
        required:true,
        type:String,
    },
    //用户状态
    state:{
        required:true,
        type:Boolean,
        default:true
    },
    //身份证号码
    idcard:{
        required:true,
        type:String
    },
    //创建时间
    time:{
        required:true,
        type:String,
        default:()=>{
            let a =new Date();
            let y = a.getFullYear();
            let m = a.getMonth();
            let d = a.getDate();
            let h = a.getHours();
            let min = a.getMinutes();
            let s = a.getSeconds();
            return `${y}-${m}-${d} ${h}:${min}:${s}`;
        }
    },
})
let users =mongoose.model("userlist",userlist);
module.exports = {
    users
}