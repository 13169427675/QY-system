let {user} = require("./schema");

module.exports = {
    finds:function(req,res,err){
        console.log("你的查找条件为：",req.query)
        user.find(
            req.query
        ).then((data)=>{
            console.log("查询成功、返回数据为：",data)
            res.send(data);
        }).catch((err)=>{
            console.log("我是find.js的第12行、自己看吧！",err);
        })
    }
}
