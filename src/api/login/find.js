let {
    users
} = require("../user/user_add_schema");
let {
    tokens
} = require("../token/schema");
let jwt = require("jsonwebtoken");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    logins: function (req, res, err) {
        let find = req.query;
        console.log("你的查找条件为：", find)
        users.find(
            req.query
        ).then((data) => {
            console.log("查询成功、返回数据为：", data);
            if (data.length == 0) {
                res.send({ 
                    token: "",
                    username: "",
                });
            } else {
                //登录成功时创建token令牌、并存储进数据库
                let token = jwt.sign({
                    name: find.user,
                    admin: "true"
                }, "I_LOVE_WUYUWEN");
                tokens.create({
                    user: find.user,
                    username: data[0].username,
                    token: token
                }).then((data) => {
                    console.log("token创建成功", data);
                }).catch((err) => {
                    console.log("token创建失败", err);
                })
                //返回前端token、username数据
                res.send({
                    token: token,
                    username: data[0].username,
                    state:data[0].state 
                });
            }
        }).catch((err) => {
            console.log("我是find.js的第31行、自己看吧！", err);
        })
    }
}