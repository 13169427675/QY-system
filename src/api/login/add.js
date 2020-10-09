let {users} = require("../user/user_add_schema");
let {control_schema} = require("../control/control_schema");
//创建用户数据api
module.exports = {
    // eslint-disable-next-line no-unused-vars
    signInadd:function(req,res,err){
        let datas = req.body;
        users.find({user:datas.user}).then((data)=>{
            let len = data.length;
            //判断新建用户名是否已存在
            if(len==0){
                //不存在则创建数据、并返回创建成功的结果给前端
                users.create(datas).then((data)=>{
                    console.log("创建数据成功：添加数据为：",data);
                    //创建成功之后建立用户权限表
                    control_schema.create({
                        user:datas.user
                    }).then((data)=>{
                        console.log("用户权限创建成功、数据为：",data);
                    })
                })
                res.send({create:"true"})
            }else{
                //存在则返回create给前端
                res.send({create:"false"});
            }
        }).catch((err)=>{
            console.log("我在创建用户数据的时候出错了、user->add.js->20行:错误信息为->",err)
        })
        
    }
}