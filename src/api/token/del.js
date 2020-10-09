let {tokens} = require("./schema");
//用户退出后删除token API
module.exports = {
    // eslint-disable-next-line no-unused-vars
    dels:function(req,res,err){
        let query = req.body;
        tokens.remove(query,{justOne:1}).then((data)=>{
            console.log("用户退出成功、已删除token",data);
            //返回result告诉前端token已删除
            res.send({result:"true"})
        }).catch((err)=>{
            console.log("我在删除token的时候出错了、token->del.js->12行:错误信息为->",err)
        })
    }
}