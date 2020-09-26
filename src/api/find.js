let {users} = require("./schema");

module.exports = {
    // eslint-disable-next-line no-unused-vars
    finds:function(req,res,err){
        console.log("你的查找条件为：",req.query)
        users.find(
            req.query
        ).then((data)=>{
            console.log("查询成功、返回数据为：",data)
            if(data.length==0){
                res.send({token:"tokenfalse",username:data[0].username});
            }else{
                console.log(data.username);
                res.send({token:"tokentrue",username:data[0].username});
            }
        }).catch((err)=>{
            console.log("我是find.js的第16行、自己看吧！",err);
        })
    } 
}
