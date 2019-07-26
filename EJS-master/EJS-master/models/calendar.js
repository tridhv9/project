var connection = require ("./connection")
class calendar{
    constructor(uuid,id,date,sc,type){
       this.emp_id=id
       this.uuid=uuid
       this.date=date
       this.shift_code=sc
       this.work_type=type
    }
    async get_calendar(emp_id)
    {
        var arr=[]
        var obj_cal;
        var query="select ATWKCALDEMP_UUID,ATWKCALDEMP_EMPID,ATWKCALDEMP_WKYEAR,"+
        "ATWKCALDEMP_WKMONTH,ATWKCALDEMP_WKDAY,ATWKCALDEMP_SHIFTCODE,ATWKCALDEMP_WORKTYPE "+
        "from ATWKCALDEMP where ATWKCALDEMP_EMPID='"+emp_id+"'"
        var cal=await connection.connect(query)
        console.log(cal)
        if(cal != "")
            JSON.parse(cal).forEach(element => {
                arr.push(new calendar(element.ATWKCALDEMP_UUID,element.ATWKCALDEMP_EMPID,new Date(element.ATWKCALDEMP_WKYEAR,element.ATWKCALDEMP_WKMONTH,element.ATWKCALDEMP_WKDAY),element.ATWKCALDEMP_SHIFTCODE,element.ATWKCALDEMP_WORKTYPE))
            });
        else
            return
        return arr
    }
}
module.exports=new calendar()
