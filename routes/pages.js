const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.render('index');
});

router.get("/register",(req,res)=>{
    res.render('register');
});

router.get("/profile",(req,res)=>{
    res.render('profile');
});
router.get("/purchase",(req,res)=>{
    res.render('purchase');
});
router.get("/gallery",(req,res)=>{
    res.render('gallery');
});
router.get("/payment",(req,res)=>{
    res.render('payment');
});
router.get("/services",(req,res)=>{
    res.render('services');
});

module.exports=router;