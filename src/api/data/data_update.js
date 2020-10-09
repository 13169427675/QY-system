let {data_schema} = require("./data_schema");
module.exports ={
    // eslint-disable-next-line no-unused-vars
    data_updata:function(req,res,err){
        let body = req.body;
        data_schema.update({},body).then((data)=>{
            console.log("更新成功：更新数据为：",data);
            res.send({status:true})
        }).catch((err)=>{
            console.log("更新失败：",err);
            res.send({status:false});
        })
    }
}