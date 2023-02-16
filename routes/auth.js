const express=require("express");
const userController =require("../controllers/users");
const router=express.Router();

router.post('/register',userController.register);
router.post('/index',userController.login);
module.exports=router;