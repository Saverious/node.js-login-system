const express=require('express');
const router=express.Router();
const authNewUserController=require('../controllers/authNewUserController');

router.post('/',authNewUserController.newUser);

module.exports=router;
