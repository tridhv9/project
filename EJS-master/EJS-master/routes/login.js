var login=require("../models/login")
var express=require("express")
const bodyParser = require('body-parser')
var router=express.Router()
const passport = require('passport');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/',async function(req,res,next){
    var error="";
    var id=req.body.id
    var password=req.body.password
    console.log(req.body)
   
    var hello=await login.login(id,password)
    //check subordinate or superviser
    try{
        
            if(hello.subordinate.length>0)
                JSON.parse(hello.subordinate).forEach(element => {
                    console.log(element)
                })
                req.login(hello.id,function(err){
                
                    if(err)
                        res.redirect("/login?valid="+hello.status)
                    else
                        res.redirect("/")
                })
    }catch(e)
        {console.log(e)}

    
})

router.get('/checkauth', passport.authenticate('local'), function(req, res){

    res.status(200).json({
        status: 'Login successful!'
    });

});
router.get('/',function(req,res){ 
    if(!req.isAuthenticated())
     res.render('auth/login');
     else
        res.redirect("/")
})
router.get("/logout",(req,res,next)=>{
    req.logout();
   
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
    });


})
module.exports=router