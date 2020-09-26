let express = require("express");
let bodyParser = require("body-parser");
let {finds} = require("./find");
let {adds} = require("./add");
let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
/*
查找接口说明：
    请求地址：http://localhost:1001/api/find
    method:get
    query:user/username/tel/email/idcard/name/password1/password2
    query:查找条件、以问号开始、多个条件可用&隔开
注册接口说明：
    请求地址：http://localhost:1001/api/add
    method:post
    data:user/username/tel/email/idcard/name/password1/password2
    response:token/user
*/
app.get("/api/find",finds);
app.post("/api/add",adds);
app.listen(1001)