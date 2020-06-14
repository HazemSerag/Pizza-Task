//third party
const jwt = require('jsonwebtoken');
//End third part


exports.authenticateToken = function(req,res,next){
    console.log(req.headers)
    // const authHeader = req.headers['Authorization'];
    const check = req.headers && req.headers.authorization.split(' ')[1]
    token=req.headers.authorization.split(' ')[1]
    console.log("Hereeeee" + token)
    if(token.toString()==='null'){
        return res.status(401).send({msg:'you dont have token}'})
    }
    
    jwt.verify(token, 'mySecret', (err,user)=>{
        if (err){
            return res.status(403).send({msg:'you dont have access'})
        }
        //user is authorized
        next()
    })
}
