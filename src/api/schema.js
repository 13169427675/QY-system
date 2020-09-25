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
    password:{
        required:true,
        type:String
    },
    tel:{
        required:true,
        type:Number
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
        type:Number
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
let user =mongoose.model("userlist",userlist);
module.exports = {
    user
}