let {
    tokens
} = require("./schema");
//token验证API
module.exports = {
    tokens: function (req, res, err) {
        let query = req.query;
        tokens.find(query).then((data) => {
            if (data.length != 0) {
                //若是找到相应的token 则通过验证，并返回filter结果告知前端
                res.send({
                    filter: "true"
                })
            } else {
                res.send({
                    filter: "false"
                })
            }
        }).catch(() => {
            console.log("我在查找token的时候出错了、token->find.js->20行:错误信息为->",err)
        })
    }
}