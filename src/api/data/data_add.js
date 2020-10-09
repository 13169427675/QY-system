let {data_schema} = require("./data_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    data_add:function(req,res,err){
        let query = req.body;
        let title = query.title;
        let mood = query.mood;
        let date = query.date;
        let content = query.content; 
        let user =query.user;
        let username=query.username;
        if(date==""){
            let a =new Date();
            let y = a.getFullYear();
            let m = a.getMonth();
            let d = a.getDate();
            let h = a.getHours();
            let min = a.getMinutes();
            let s = a.getSeconds();
            if(min<10){
                min = "0"+min
            }
            if(s<10){
                s = "0"+s
            }
            date = `${y}-${m}-${d} ${h}:${min}:${s}`;
        }
       
        data_schema.create({title,mood,content,date,user,username}).then((data)=>{
            console.log("创建成功、数据为：",data);
            res.send({status:true})
        }).catch((err)=>{
            res.send({status:false})
            console.log(err);
        })
    }
}

// data_schema.create({
//     title:"sad",
//     mood:"sadf",
//     date:"asdff",
//     content:"ddddddd"
// }).then((data)=>{
//     console.log("创建成功、数据为：",data);
// }).catch((err)=>{
//     console.log(err);
// })