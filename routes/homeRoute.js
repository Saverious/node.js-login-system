const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');

// http://localhost:3000/home
router.get('/',homeController.home);

module.exports=router;