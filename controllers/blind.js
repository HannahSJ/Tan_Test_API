var models = require('../models/model');

module.exports = {
    addWatcherInBlindById: async (req, res) => {
        const {_id} = req.params
        const result = await models.Blind.findById(_id)
        var watcher = {watcher: req.body.watcher}
        result.watcher.push(watcher)
        result.save()
        res.status(200).json(result)
    },

    addLocationInDataById: async (req, res) => {
        const { _id} = req.params
        const result = await models.Blind.findById(_id)
        var location = {lat: req.body.lat, long: req.body.long}
        result.location.push(location)
        result.save()
        res.status(200).json(result)
    },
    
    creteData: async (req, res, next) => {
        models.Blind.findOne({first_name: req.body.first_name})
        .then(async blind => {
            if(blind){
                res.status(409).json({
                    message: "mail is exists", statusCode: 409
                })
            }else{
                const newData = new models.Blind(req.body)
                const result = await newData.save()
                .then(result => {
                    res.status(201).json(result)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        statusCode: 500
                    })
                })
            }
        })
    }
}