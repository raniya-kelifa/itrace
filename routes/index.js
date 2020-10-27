var express = require('express');
var authController = require('../controllers/auth');



 var router = express.Router();

router.get('/resetpassword',(req,res)=>{
  res.render('resetpassword');
});
router.get('/',(req,res)=>{
  res.render('index');
});
router.get('/login',(req,res)=>{
  res.render('login')
});
router.get('/login/login',(req,res)=>{
  res.render('login_again')
})
router.get('/signup',(req,res)=>{
  res.render('signup') })
router.get('/login/forgetpassword',(req,res)=>{
res.render('reset')
})
router.get('/logout', authController.loginAction)

module.exports = router;