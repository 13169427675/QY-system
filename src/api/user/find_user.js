let {
    users
} = require("./user_add_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    userall: function (req, res, err) {
        let limits = Number(req.query.limit); 
        let skips = Number(req.query.begin);
        users.find({
            
        }, {
            email: false,
            name: false,
            password1: false,
            password2: false,
            idcard:false,
            __v:false,
            _id:false
        }, {
            limit: limits,
            skip:skips
        }).then((data) => {

            res.send(data);
        }).catch((err) => {
            console.log("我在查找全部用户时出错了", err);
        })
    }
}