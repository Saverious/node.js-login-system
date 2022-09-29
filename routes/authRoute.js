const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');

// http://localhost:3000/auth
router.post('/',authController.login);

module.exports=router;