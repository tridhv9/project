var router=require("express").Router()
var calendar=require("../models/calendar")
router.get("/",async(req,res)=>{
    var cal =await calendar.get_calendar(req.user.id)
    console.log(cal)
    res.send(cal)
})

router.get("/subo",async (req,res)=>
{
    // var arr=[]
    // var tmp;
    // var subordinates=JSON.parse(req.user.subordinate)
    // console.log(subordinates)
    // subordinates.forEach(element => {
    //     arr.push(calendar.get_calendar(element.HREMP_EMPID))
    //     calendar.get_calendar(element.HREMP_EMPID).then(result=>{
    //         console.log(result)
    //         if(result!=null)
    //             arr.push(result)   
    //     })
    // })
    // Promise.all(arr).
    // then((result)=>console.log(result))

    // setTimeout(function(){
    //     res.send(arr)
    //   }, 150);      
    var arr=[]
    var tmp;
    var subordinates=JSON.parse(req.user.subordinate)
    console.log(subordinates)
    subordinates.forEach(element => {
        tmp=calendar.get_calendar(element.HREMP_EMPID)
            arr.push(tmp)
    })
    Promise.all(arr).
    then((result)=>
    {
        var ar=[]
        result.forEach(result=>{
            if(result.length>0)
                ar.push(result)
           
        })
        console.log(ar)
        res.send(ar)
    })

})

module.exports=router