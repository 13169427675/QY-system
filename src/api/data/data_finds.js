let {data_schema} = require("./data_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    data_finds:function(req,res,err){
        let query = req.query;
        data_schema.find(query).then((data)=>{
            res.send(data);
        })
    } 
}