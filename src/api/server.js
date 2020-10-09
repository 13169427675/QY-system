let express = require("express");
let bodyParser = require("body-parser");
let {logins} = require("./login/find");
let {signInadd} = require("./login/add");
let {tokens} = require("./token/find");
let {dels} = require("./token/del");
let {userall} = require("./user/find_user");
let {controlall} =require("./control/find_control");
let {update_user} = require("./user/update_user");
let {del_user} = require("./user/del_user");
let {find_user} = require("./user/find");
let {data_add} = require("./data/data_add");
let {data_finds} = require("./data/data_finds");
let {data_find} = require("./data/data_find");
let {data_updata} = require("./data/data_update");
let {control_updata} = require("./control/control_updata");
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
/*
登录查询接口说明：
    请求地址：http://localhost:1001/api/userlogin
    method:get
    query:user/username/tel/email/idcard/name/password1/password2
    query=>查找条件、以问号开始、多个条件可用&隔开
注册接口说明：
    请求地址：http://localhost:1001/api/add
    method:post
    data:user/username/tel/email/idcard/name/password1/password2
    response:token/user
查找用户接口说明
    请求地址：http://localhost:1001/api/userall
    method：get
    query:null
查找权限接口说明
    请求地址：http://localhost:1001/api/controlall
    method:get
    query:null
*/ 
app.get("/api/userlogin",logins);
app.post("/api/signInadd",signInadd);
app.get("/api/tokenfind",tokens);
app.post("/api/tokendel",dels);
app.get("/api/userall",userall);
app.get("/api/controlall",controlall);
app.post("/api/update",update_user);
app.get("/api/del",del_user);
app.get("/api/finduser",find_user);
app.post("/api/dataadd",data_add)
app.get("/api/datafinds",data_finds) 
app.get("/api/datafind",data_find) 
app.post("/api/dataupdata",data_updata) 
app.post("/api/controlupdata",control_updata) 
app.listen(1001)