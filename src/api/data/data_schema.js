let mongoose = require("mongoose");
//mongodb数据表规则
mongoose.connect("mongodb://localhost:27017/QY_System",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("data数据连接数据库成功");
}).catch((err)=>{
    console.log("data数据连接数据库失败",err);
})
let schema = mongoose.Schema;
let dataadd = new schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    
    date:{
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
    }
})
let data_schema = mongoose.model("datas",dataadd);
module.exports={
    data_schema
} 