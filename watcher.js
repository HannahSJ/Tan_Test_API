var models = require('../models/model');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const key = 'shhhh';
const { Watcher } = require('../models/model');

module.exports = {
   createData: async (req, res, next) => {
        models.Watcher.findOne({mail: req.body.mail})
        //.exec()
        .then(async watcher => {
            if(watcher){
                res.status(409).json({
                    message: "mail is exists", statusCode: 409
                })
            }else{
                const newData = new models.Watcher(req.body)
                console.log('newData', newData);
                const { password } = req.body
                bcryptjs.hash(password, 10, async (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err,
                            statusCode:500
                        })
                    }else{
                        const newData = new models.Watcher({
                            user_name: req.body.user_name,
                            mail: req.body.mail,
                            password: hash
                        })
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
        })
   },

    loginWatcher: async (req, res) => {
       const { mail, password } = req.body 
       Watcher.findOne({mail:mail})
       .then(watcher => {
            console.log('passwoed = ', password);
            // console.log('watcher.password = ', watcher.password);
            console.log("type wacther = ", watcher);
           if(watcher){
                bcryptjs.compare(password, watcher.password, (err, callback) => {
                    console.log('callback', callback);
                if (callback) {
                    const token = jwt.sign({
                        user_name: watcher.user_name,
                        mail: watcher.mail
                    }, key, { expiresIn: '1d'})
                   return res.status(200).send(token)
               }
            //    if(watcher.password === password){
            //         return res.status(200).json({
            //             message: 'login',
            //             statusCode: 200
            //         })
            //    }
               else {
                   return res.status(401).json({
                       message:'wrong password',
                       statusCode: 401
                   })
               }
            })
           }else {
               return res.status(401).json({
                   message: 'No email in system',
                   statusCode: 401
               })
           }
       })
    
    

//    createDataHashPassword: async (req, res) => {
//         const { password } = req.body
//         console.log(password)
//         bcryptjs.hash(password, 10, async (err, hash) => {
//             if(err){
//                 return res.status(500).json({
//                     error: err,
//                     statusCode: 500
//                 })
//             }else{
//                 const newData = new models.Watcher({
//                     user_name: req.body.user_name,
//                     mail: req.body.mail,
//                     password: hash
//                 })
//                 const result = await newData.save()
//                 .then(result => {
//                     res.status(201).json(result)
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                         error: err,
//                         statusCode: 500
//                     })
//                 })
//                 console.log("body", req.body);
//                 console.log(newData);
//                 console.log(hash);
//             }
//         })

    
//    }

    },
    
    findWatcherByToken: async (req, res) => {
        const {mail} = req.decoded
        console.log(mail);
        const result = await models.Watcher.findOne({mail:mail})
            if(result){
                return res.status(200).send(result)
            } else {
                return res.status(401).json({
                    message: 'No email in system',
                    statusCode: 401
                })
            }
    },

    changePassword: async (req, res) => {
        console.log(req.decoded);
        const {mail} = req.decoded
        const {password, new_password} = req.body
        const result = await models.Watcher.findOne({mail:mail})
            if(result){
                bcryptjs.compare(password, result.password, (err, callback) => {
                    if(callback){
                        bcryptjs.hash(new_password, 10, async(err, hash) => {
                            if(err){
                                return res.status(500).json({
                                    error: err,
                                    statusCode:500
                                })
                            } else {
                                await models.Watcher.findOneAndUpdate({mail:mail}, {password:hash})
                                return res.status(200).json({
                                    message: 'Password Change',
                                    statusCode: 200
                                })
                            }
                        })
                         
                    } else{
                        return res.status(401).json({
                            message: 'Wrong Password',
                            statusCode: 401
                        })
                    }
                })
            } else{
                return res.status(401).json({
                    message: 'No email in system',
                    statusCode: 401
                })
            }
    }

}

// async function hash() {
//     console.log('aa');
    
//     var A = null
//     if(A) {
        
//         console.log('IF');
//     }
//     else {
//         console.log(A);
//         console.log('ELSE');
//     }
// }


// async function test(){
//     var mail = 'Aoom@gmail.com'
//     const result = await Watcher.findOne({mail:mail})
//     if(result){
//         console.log(mail, 'in sys');
//     } else {
//         console.log(mail, 'not in sys');
//     }
// }

// async function test1(){

//     var a = 12
//     var b = a == 123?"ture":'false'
//     console.log(b);

// }
// test1()
//hash()