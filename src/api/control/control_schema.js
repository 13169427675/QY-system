//用户权限规则
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/QY_System",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("权限管理连接数据库成功");
}).catch((err)=>{
    console.log("权限管理连接数据库失败",err);
})
let schema = mongoose.Schema;
let control = new schema({
    //用户名称
    user:{
        required:true,
        type:String,
    },
    //用户是否有禁用权限
    forbidden:{
        required:true,
        type:Boolean, 
        default:false
    },
    //用户是否有删除权限
    del:{
        required:true,
        type:Boolean,
        default:false
    },
    //用户是否有用户数据修改权限
    change:{
        required:true,
        type:Boolean,
        default:false
    },
    //用户是否可以访问更改control控制页面
    control:{
        required:true,
        type:Boolean,
        default:false
    }
})
let control_schema = mongoose.model("controls",control);
module.exports={
    control_schema
}