let {
    user
} = require("./schema");
user.update({
    //查询条件
    username: "随你"
}, {
    //更新内容
    name: "sadf"
}, {
    //全部更新、默认false更新第一条数据
    multi: true
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err)
})