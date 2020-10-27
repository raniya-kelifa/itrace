 var userModel = require('../models/user')
var dataBase = require('../config/dabaB')
const bcrypt = require('bcryptjs');
const { db } = require('../models/user');
const nodemailer = require('nodemailer');

 const authController = {
 loginAction: async (req, res) => {
  
          try {
           passW = req.body.password
          let users = await db.collection('itraceUser').findOne({userame:req.body.userame});
         
                if(users !== null){
                 bcrypt.compare(passW, users.password, function(err, isMatch) {
  // if the password and username matched this will be excuted and then will send the user to user's page
                   if (err) throw err;
                    if(isMatch){
                   console.log(isMatch)
                   res.send('logged in')
                    }else{
  // if the password and username doent't match this will be excuted and then will send it to login page andin with reset password link
                      console.log('Username or Password not correct')
                    res.send('not match ')
                    }
                        })
                        db.close()
                      }
 
              }catch (error) {
               console.log(error)
              }
           },   

  signupAction: (req, res) => {
            var email = req.body.email;
            var coPassword = req.body.coPassword;
            var password = req.body.password;
            var username = req.body.username;
            
            
              req.checkBody('email', 'Email is required.').notEmpty();
              req.checkBody('username', 'username is required.').notEmpty();
              req.checkBody('password', 'Password is required.').isLength({min:6});
              req.checkBody('coPassword', 'Password not same, try again!!').equals(password);
            
              var errors = req.validationErrors();
            
              if(errors){
  //if there is an error in the entry of the information then the this will show the error and ask the user to enter the information again , by redirecting  to the registration page
                console.log('errors')
                res.send('registeration page')
         
              }else{ 
  // if not this will register the user to database, and send them to login page to login.
              res.send('login page')
              userModel.create({
                username:  req.body.username,
                email: req.body.email,
                password: req.body.password,
                created_at: Date.now()
           }).then(data =>{
             console.log(data)
           dataBase.userRegistration(data) 
           })
              }
             
            
                },
  forgetPasswordAction: async (req, res) => {
  // The user will be asked to enter thier email address if found there will be a link sent to them to reset thier password.
            try {
             let users = await db.collection('itraceUser').findOne({email:req.body.email});

                   if(users !== null){
                  console.log('Found the Email')
                  res.send('reset password')
                  var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'itrace email address',
                        pass: 'itrace password'
                        }
                      });
                      let mailOptions = {
                        from: 'raniyakelifa12@gmail.com',
                        to: req.body.email,
                        subject: 'Test',
                        text: `http://localhost:4242/resetpassword/${users._id}`
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                           console.log(error.message);
                        }else
                        console.log('success');
                      });
                
                            }else{
         
                              console.log('Email Not Found')
                              res.redirect('/')
                              db.close()
                  }
                 }catch (error) {
                  console.log(error)
                 }
   },
    
          
        replaceLink:(req, res)=>{
          var coPassword = req.body.coPassword;
          var password = req.body.password;
          var email = req.body.email;
      
          req.checkBody('email', 'email is required.').notEmpty();
          req.checkBody('password', 'Password is required.').isLength({min:6});
          req.checkBody('coPassword', 'Password not same, try again!!').equals(password);
        
      
          var errors = req.validationErrors();
          
          if(errors){
            console.log('error')
            res.redirect('/resetpassword')
      
          }else{
            console.log('no errors')
            dataBase.replacePassword(email,password)
            
          }
        },
      
      
      
          logoutAction:(req,res,next)=>{
      if(req.isAuthenticated()){
        return next()
      
      }
      else{
        res.redirect('/login')
      }
          },
        }
      
              
      
 module.exports = authController
      