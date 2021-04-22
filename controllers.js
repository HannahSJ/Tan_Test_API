var models = require('../models/model');
const watcher = require('./watcher');

module.exports = {
    readAllData: async (req, res, next) => {
        console.log(req.params);
        const { schema } = req.params
        //console.log(schema)
        //console.log(models[schema])
        if(models[schema] === undefined){
             res.status(404).send({error: {message: 'Not Found Schema'}})
        }else {
            const result = await models[schema].find({})
            res.status(200).send(result)
        }
    },

    readDataById: async (req, res) => {
        console.log(req.params);
        console.log(models);
        const { schema, _id } = req.params
        if(models[schema] === undefined){
            return res.status(404).send({error: {message: 'Not Found Schema'}})
        }
        const result = await models[schema].findById(_id)
        res.status(200).send(result)
    },
    
    createData: async(req, res) => {
        const { schema } = req.params
        if(models[schema] === undefined){
            return res.status(404).send({error: {message: 'Not Found Schema'}})
        }
        const newData = new models[schema](req.body)
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
    },

    updateDataById: async (req, res) => {
        const { schema, _id } = req.params
        if(models[schema] === undefined){
        return res.status(404).send({error: {message: 'Not Found Schema'}})
    }
       const newData = new models[schema](req.body)
       const result = await models[schema].findByIdAndUpdate(_id, newData, {new:true})
       res.status(200).json(result)
       console.log(req.params)
   },

    deleteDataById: async (req, res) => {
        const { schema, _id } = req.params
        if(models[schema] === undefined){
        return res.status(404).send({error: {message: 'Not Found Schema'}})
    }
        const result = await models[schema].findByIdAndDelete(_id)
        res.status(200).json({ message: 'Delete', result })
        console.log(req.params)
   },
   
}

// async function funsc() {
//     const Watcher = models.Watcher
//     console.log(Watcher); 
//     const _id = '60300e21ae688a249c2532ba'
//     const A = await Watcher.find({})

//     // console.log(_id == '60300e21ae688a249c2532ba'); // เช็ค boolean


//     // console.log(A); // ดูค่าทั้งหมดของ A
//     // for(i in A){
//     //     // console.log("index : ", i, "value : ", A[i]); //ลูปเช็คค่าแต่ละ index
       

//     //     if(i == 10){
//     //         console.log("index : ", i, "value : ", A[i]._id)
//     //     }

//     //     //i == 1?console.log("index : ", i, "value : ", A[i]):"" // if shorthand


//     // }

//     for (i in A) if (A[i]._id == _id) console.log(A[i]) // loop and if shorthand

//     // var b = ["a","b","c","d","e"]
//     // console.log(b);
//     // for (var i in b){
//     //     console.log("index : ", i, "value : ", b[i]); 
//     // }
    

// }

// funsc()



