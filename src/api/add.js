let {user} = require("./schema");
user.create({
    user:"13169427675",
    username:"随你",
    password:"776543",
    tel:13169427675,
    email:"997884551@qq.com",
    name:"林利军",
    idcard:440223199604093710
}).then((data)=>{
    console.log("数据创建成功！");
    console.log(data);
}).catch((err)=>{
    console.log("数据创建失败！",err);
})