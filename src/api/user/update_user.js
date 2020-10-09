let {
    users
} = require("./user_add_schema");
// user.update({
//     //查询条件
//     username: "随你"
// }, {
//     //更新内容
//     name: "sadf"
// }, {
//     //全部更新、默认false更新第一条数据
//     multi: true
// }).then((data) => {
//     //
//     console.log(data)
// }).catch((err) => {
//     console.log(err)
// })
module.exports = {
    // eslint-disable-next-line no-unused-vars
    update_user:function(req,res,err){
        let query = req.body;
        console.log("查询条件为：",query);
        users.update({user:query.user},{state:query.state}).then((data)=>{
            console.log("更新成功、更新的数据内容为：",data);
            res.send({status:200})
        }).catch((err)=>{
            console.log("数据更新失败、",err);
            res.send({status:400});
        })
    }
}