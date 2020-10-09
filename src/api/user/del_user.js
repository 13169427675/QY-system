let {
    users
} = require("./user_add_schema");
let {
    control_schema
} = require("../control/control_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    del_user: function (req, res, err) {
        let query = req.query;
        users.remove(query, {
            justOne: 1
        }).then((data) => {
            console.log("用户删除成功", data);
            //成功删除用户需要把用户的权限列表相应清除
            control_schema.remove(query, {
                justOne: 1
            }).then((data) => {
                console.log("用户权限清除成功！", data);
            }).catch((err) => {
                console.log("用户权限清除失败", err);
            })
            res.send({
                status: 200
            });
        }).catch((err) => {
            console.log("删除失败", err);
            res.send({
                status: 400
            });
        })
    }
}