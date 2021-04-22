const jwt = require('jsonwebtoken');
 module.exports = (req, res, next) => {
     //const {body} = req
     const {token} = req.headers
     //console.log(req.headers);
     if(token) {
        var decoded = jwt.verify(token, 'shhhh')
        //console.log(decoded);
        //console.log(token);
        //return res.status(200).json(decoded)
        req.decoded = decoded
        next()
    } else {
        return res.status(404).json({
            message:'No Token',
            statusCode: 404
        })
    }
 }