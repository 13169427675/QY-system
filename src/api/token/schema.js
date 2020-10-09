let mongoose = require("mongoose");
//token 创建规则
mongoose.connect("mongodb://localhost:27017/QY_System",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("token链接数据库成功");
}).catch((err)=>{
    console.log("token链接数据库失败",err);
})
let schema = mongoose.Schema;
let tokenlist = new schema({
    user:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
})
let tokens = mongoose.model("tokens",tokenlist);
module.exports = {
    tokens
}
