let {
    users
} = require("./user_add_schema");
module.exports = {
    find_user:function(req,res,err){
        let query = req.query;
        users.find(query,{
            email: false,
            name: false,
            password1: false,
            password2: false,
            idcard:false,
            __v:false,
            _id:false
        }).then((data)=>{
            res.send(data)
        })
    }
}