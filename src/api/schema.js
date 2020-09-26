let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/QY_System",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("数据库连接成功");
}).catch((err)=>{
    console.log("数据库连接失败",err);
})
let schema = mongoose.Schema;
let userlist = new schema({
    user:{
        required:true,
        type:String
    },
    username:{
        required:true,
        type:String
    },
    password1:{
        required:true,
        type:String
    },
    password2:{
        required:true,
        type:String
    },
    tel:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String,
    },
    idcard:{
        required:true,
        type:String
    },
    time:{
        required:true,
        type:Date,
        default:()=>{
            let a =Date.now()+1000*3600*8;
            return a;
        }
    }
})
let users =mongoose.model("userlist",userlist);
module.exports = {
    users
}