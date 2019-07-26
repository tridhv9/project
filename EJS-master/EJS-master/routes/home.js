var router=require("express").Router()
var passport=require("passport")
router.get("/",(req,res)=>{
   console.log(req.isAuthenticated())
    if(req.isAuthenticated())
       { 
        
        console.log(req.user)

        var data={
            user:req.user
        }
        res.render("index",data)
        
       }
    else
    {
        res.redirect("/login")
        res.status(500).end("false")
    }
})

module.exports=router