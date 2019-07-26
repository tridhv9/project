var connection=require("./connection")

class login
{
 
    constructor(id,code,role,s1,s2,name,sub,status,success)
    {
        this.id=id;
        this.code=code
        this.role=role;
        this.supervise1=s1;
        this.supervise2=s2;
        this.subordinate=sub
        this.status=status
        this.name=name
        this.success=success
    }
    async get_user(id)
    {
        var users=new login()
        var get="select * from tbl_login where emp_code='"+id+"'"
        var user=JSON.parse(await connection.connect(get))
        user.forEach(Element=>{
            users.code=id
            users.id=Element.emp_id
            users.role=Element.title
            users.supervise1=Element.sup1
            users.supervise2=Element.sup2
        })
        console.log(users.id)
        var subordinate=JSON.parse(await connection.connect("select HREMP_NAME,HREMP_EMPCODE,HREMP_EMPID,HREMP_TITLE,HREMP_SUVISOR1,HREMP_SUVISOR2 from HREMP where HREMP_SUVISOR1='"+users.id+"'"))
        users.subordinate=JSON.stringify(subordinate)
        return users
    }
    async login(id,password)
    {
      var arr=[]
        var session;
        var id_except=JSON.parse(await connection.connect("select HREMP_EMPID,HREMP_NAME,HREMP_EMPCODE,HREMP_TITLE,HREMP_SUVISOR1,HREMP_SUVISOR2 from HREMP where HREMP_EMPCODE='"+id+"'"))
        
        if(id_except!="")
        {  
            var sup1,sup2,title,name,emp_id,emp_code;
            id_except.forEach(Element=>{
                emp_id=Element.HREMP_EMPID
            })
            var subs=[]
            var id_login=JSON.parse(await connection.connect("select * from tbl_login where emp_id='"+emp_id+"'"))
            arr.push(id_login)
            id_except.forEach(Element=>{
                name=Element.HREMP_NAME
                sup1=Element.HREMP_SUVISOR1
                sup2=Element.HREMP_SUVISOR2
                title=Element. HREMP_TITLE
                
                emp_code=Element.HREMP_EMPCODE
            })
            var subordinate=JSON.parse(await connection.connect("select HREMP_NAME,HREMP_EMPCODE,HREMP_EMPID,HREMP_TITLE,HREMP_SUVISOR1,HREMP_SUVISOR2 from HREMP where HREMP_SUVISOR1='"+emp_id+"'"))
            
                subordinate.forEach(Element=>{
                    subs.push(new login(Element.HREMP_EMPID,Element.HREMP_EMPCODE,Element.HREMP_TITLE,Element.HREMP_SUVISOR1,Element.HREMP_SUVISOR2,Element.HREMP_NAME))
                    console.log(Element)
                })
            console.log("ACH KO")
            console.log(id_login)
            if(id_login=="")
            {
                console.log("insert into tbl_login(emp_id,emp_code,password,title,sup1,sup2) values('"+emp_id+"','"+emp_code+"','"+password+"','"+title+"','"+sup1+"','"+sup2+"')")
                connection.connect("insert into tbl_login(emp_id,emp_code,password,title,sup1,sup2) values('"+emp_id+"','"+emp_code+"','"+password+"','"+title+"','"+sup1+"','"+sup2+"')")
                session=new login(id,emp_code,title,sup1,sup2,name,JSON.stringify(subs),"You have sucessfully registered",true)
                console.log(session)
            }
            else
            {
                arr.forEach(Element=>{
                    console.log(Element)
                    if(Element[0].password==password)
                        session=new login(id,emp_code,title,sup1,sup2,name,JSON.stringify(subs),"Success",true)
                    else
                    {
                        console.log("You have enterned wrong password")
                        session=new login("","","","","","",[],"you have entered wrong password",false)
                      
                     }
                })
            }
        }
        else
        {
            session=new login("","","","","","",[],"Id does'nt exist",false)
            console.log("Nothing at all")
        }
        return session
    }
}
module.exports=new login()