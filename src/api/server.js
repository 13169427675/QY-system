let express = require("express");
let {finds} = require("./find");
let app = express();
/*
查找接口说明：
    请求地址：http://localhost:1001/find?query
    query:查找条件、以问号开始、多个条件可用&隔开

*/
app.get("/find",finds)
app.listen(1001)