let {user} = require("./schema");
user.remove({
    username:"随你"
},{justOne:1}).then((data)=>{
    console.log("删除成功！",data);
}).catch((err)=>{
    console.log("删除失败！",err)
})