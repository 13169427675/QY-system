let {
    data_schema
} = require("./data_schema");
module.exports = {
    // eslint-disable-next-line no-unused-vars
    data_find: function (req, res, err) {
        let query = req.query;
        let limit = Number(query.limit);
        let skip = Number(query.begin);
        data_schema.find({}, {
            _id: false,
            __v: false
        }, {
            limit: limit,
            skip: skip
        }).then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err)
        })
    }
}