const { user } = require("./schema");

let {users} = require("./schema");
module.exports = {
    adds:function(req,res,err){
        let datas = req.body;
        users.find({user:datas.user}).then((data)=>{
            let len = data.length;
            if(len==0){
                users.create(datas).then((data)=>{
                    console.log("创建数据成功：添加数据为：",data);
                })
                res.send({create:"true"})
            }else{
                res.send({create:"false"});
            }
        })
        
    }
}