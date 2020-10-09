//权限更新
let {control_schema} = require("./control_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    control_updata:function(req,res,err){
        //前端传递的更新数据
        let query = req.body;
        //更新权限
        control_schema.update({user:query.user},query).then((data)=>{
            console.log("权限更新成功",data);
            res.send({status:true});
        }).catch((err)=>{
            console.log("权限更新失败",err);
            res.send({status:false})
        })
    }
}