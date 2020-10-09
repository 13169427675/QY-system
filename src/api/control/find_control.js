let {
    control_schema
} = require("./control_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    controlall: function (req, res, err) {
        control_schema.find({}).then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log("我在查找全部用户权限时出错了", err);
        })
    }
}