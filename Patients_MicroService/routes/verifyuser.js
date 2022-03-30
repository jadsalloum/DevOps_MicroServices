
const jwt = require("jsonwebtoken");

const VerifyUser = (req,res,next) => {
    
    const token = req.header("auth-token");
    console.log(" token  = " + token);
    if (!token) 
    {
        return res.status(401).json({ error: "Access denied, please login !" });
    }
    //try {
    const _user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = _user;
    console.log("Token Verified  for User with ID = " + _user._id + " , UserName = " + _user.username + "  , Role = " + _user.role);
    next();// used to continue to next middleware
    //} 
    //catch( error) 
    //{res.status(400).json({ error: "Invalid Token, please sign-in" });}

}

module.exports = VerifyUser;

