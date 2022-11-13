var jwt = require('jsonwebtoken');
exports.isLoggedIn=(req, res, next)=> {
    console.log(req.headers);
    if (!req.headers['token']) {
       return res.send(401, "Unauthorized");
    } 
     jwt.verify(req.headers['token'], 'secret', function(err, decoded) {
        if(err){
            return res.send(401, err);
        }
        // console.log(decoded) // bar
        next();
      });
};

