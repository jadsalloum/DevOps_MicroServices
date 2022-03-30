const router = require("express").Router();
// import the model
const Users = require('../models/users');
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()

router.get('/', (req, res) => {
   
    res.render('login');
});

// POST - login Request
router.post('/', jsonParser,  async function(req, res)  {
    //try{
        
    console.log("Body = " + req.body.username);

    const _user = req.body.username;// .body.username;
    const _pass = req.body.password;// .body.password;

    const DBUser = await Users.findOne({username: _user});
    console.log("secret = " + process.env.JWT_TOKEN_SECRET)

    if(_pass == DBUser.password){

        const token = jwt.sign({
            _id: DBUser._id,
            username: DBUser.username,
            role: DBUser.role
        }, process.env.JWT_TOKEN_SECRET, { expiresIn: "24h" });

        const _user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = _user;
        console.log("Token Verified  for User with ID = " + _user._id + " , UserName = " + _user.username + "  , Role = " + _user.role);

        //res.render('LoginSuccessful', {message: "Login Successfull !! , Welcome " + DBUser.role + " " + DBUser.firstName + " " + DBUser.lastName });
        //return res.status(200).json({ message: "Login Successfull !! , Welcome " + DBUser.role + " " + DBUser.firstName + " " + DBUser.lastName });
        res.send("Login Successfull !! , Welcome " + DBUser.role + " " + DBUser.firstName + " " + DBUser.lastName + "\n" + "Token = " + token);

    }
    else{
        return res.status(400).json({ error: "Please Check Your Username and Password !!" });
    }
//}catch(error){
  //  return res.status(400).json({ error: "error.... Please Check Your Username and Password !!" });
//}
});

module.exports = router ;