const mysql=require("mysql");
const bcrypt=require("bcryptjs");

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,  
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
});

exports.login = async (req, res) => {
   try{
    const { phone, password } = req.body;

        db.query("select * from users where phone=?",
        [phone],
        async(error,result)=>{
            
                console.log(result);
                if(phone==9760371731 && password=="admin"){
                    return res.status(401).render('services');
                }
                else if(result.length<=0){
                    return res.status(401).render('login',{
                        msg:' phone and password incorrect',
                        msg_type:"error",
                    });
                }
                else if(!(await bcrypt.compare( password,result[0].PASS))){
                        return res.status(401).render('login',{
                            msg:' phone and password incorrect',
                            msg_type:"error",
                        });
                    }
                    else{
                        res.status(402).render("profile");
                    } 
            }
         
    );
   }catch(error){
    console.log(error);
    }
   };


exports.register=(req,res)=>{
console.log(req.body);

// const name=req.body.name;
// const phone=req.body.phone;
// const password=req.body.password;
// const confirm_password=req.body.confirm_password;
const{name,phone,password,confirm_password}=req.body;
db.query('select phone from users where phone=?',
[phone],
async(error,result)=>{
if(error){
    confirm.log(error);
}
if(result.length>0){
    return res.render('register',
    {msg:'This PhoneNumber is already taken',msg_type:'error'});
}else if(password!==confirm_password){
    return res.render("register",{msg:"Password does'nt match"
    ,msg_type:'error'});
}
let hashedPassword =await bcrypt.hash(password,8);
// console.log(hashedPassword);
db.query('insert into users set ?',{name:name,phone:phone,pass:hashedPassword},
(error,result)=>{
    if(error){
        console.log(error);  
    }else{
        console.log(result);
        return res.status(402).render("login");
    }
});

});


};
 