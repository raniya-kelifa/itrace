var userModel = require('../models/user')
var dataBase = require('../config/dabaB')
const bcrypt = require('bcryptjs');
const { db } = require('../models/user');
const nodemailer = require('nodemailer');
var fbMODEL =require('../models/accessJsonfb');
var adMODEL = require('../models/jsonfb');
var YTMODEL= require('../models/accessYT')
var channelMODEL = require('../models/ytChannel')

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
                   res.send(' <a href="localhost:4242/facebookFeed">You can view your facebook ad </a> <a href=" localhost:4242/facebookFeed/ad">You can view your facebook feed ad </a> <a href=" localhost:4242/youTube">You can view your youtube account </a> <a href=" localhost:4242/youTube/channel">You can view youtube channel </a>'
                            )
                   
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
              userModel.create({
                username:  req.body.username,
                email: req.body.email,
                password: req.body.password,
                created_at: Date.now()
           }).then(data =>{
             res.send('registered')
           dataBase.userRegistration(data) 
           })
        },
  forgetPasswordAction: async (req, res) => {
  // The user will be asked to enter their email address if found there will be a link sent to them to reset their password.
            try {
             let users = await db.collection('itraceUser').findOne({email:req.body.email});

                   if(users !== null){
                  
                  var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'raniyakelifa12@gmail.com',
                        pass: 'habibasaid121'
                        }
                      });
                      let mailOptions = {
                        from: 'raniyakelifa12@gmail.com',
                        to: req.body.email,
                        subject: 'Reset Password',
                        text: `http://localhost:4242/resetpassword/${users._id}`
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                           console.log(error.message);
                        }else
                  
                       res.send('Please check your Email we have sent you a link.');
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
  facebookApi:async (req,res)=>{
          var id = Math.floor(1000000000000 + Math.random() * 9000000000000)
          ID= id.toString()
          var d = new Date()
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            fbMODEL.create({
              created_time: Date.now(),
              message: "This is the post on date " + d.getDate() +" in  " + months[d.getMonth()] + " During the pamdamic year " + d.getFullYear(),
              id:ID
         }).then(data =>{
           res.json({
             data
           })
         })

        },
  facebookad:async(req, res)=>{
         
          var id = Math.floor(1000000000000 + Math.random() * 9000000000000)
          ID= id.toString()
       
           adMODEL.create({
            is_eligible_for_promotion: true,
            promotable_id: ID,
            id: id + id
         }).then(data =>{
           res.json({
             data
           })
         })
        
        },
  youTube:async (req,res)=>{
         
          var id = Math.floor(100 + Math.random() * 900)
          var ID=Math.floor(10000000 + Math.random() * 90000000)
        
        
        YTMODEL.create({
          id: ID,
          kind: "youtube account",
          etag: "33a64df551425fcc55e4d42a148795d9f25f89d4",
          contentDetails: {
            relatedPlaylists: {
              likes: id*id,
              favorites: id,
              watchHistory: id*id*id,
              watchLater: id+20,
            }
          }
        }).then(data =>{
          res.json({
            data
          })
        })
          
        },
  ytChannel:async(req,res)=>{
 
  var id = Math.floor(100 + Math.random() * 900)
 
channelMODEL.create({
kind: "YOUTUBE CHANNEL",
etag:  "33a64df551425fcc55e4d42a148795d9f25f89d4",
id: id,
snippet: {
  title:"Nodejs",
  description:"Backend",
  customUrl:"https://youtu.be/3JWTaaS7LdU?list=RDYsXMglC9A",
  publishedAt: Date.now(),
  thumbnails: {   
      url: "https://youtu.be/3JWTaaS7LdU?list=RDYsXMglC9A",
      width: "365",
      height: "200"
      },
  defaultLanguage:"English",
  localized: {
    title: "ACCESS API",
    description: "Here is our Description",
      },
  country:"Ethiopia"
    },
contentDetails: {
  relatedPlaylists: {
    likes: id*15,
    favorites:id-60,
    uploads:id
      }
    },
statistics: {
  viewCount:id*id*id,
  subscriberCount:id*id,  // this value is rounded to three significant figures
  hiddenSubscriberCount: id-56,
  videoCount:id,
    },
topicDetails: {
  topicIds: [
      id
      ],
  topicCategories: [
      "education"
  ]
    },
status: {
  privacyStatus:"Public",
  isLinked:  true,
  longUploadsStatus:id,
  madeForKids:  true,
  selfDeclaredMadeForKids:  true
    },
brandingSettings: {
  channel: {
    title:"itace",
    description:"here is the description",
    keywords:"keywords",
    defaultTab:"tab",
    trackingAnalyticsAccountId:id*52,
    moderateComments:  true,
    showRelatedChannels:  true,
    showBrowseView:  true,
    featuredChannelsTitle:"none",
    featuredChannelsUrls: [
        "none"
        ],
    unsubscribedTrailer:"the expected data",
    profileColor:"red",
    defaultLanguage:"english",
    country:"Ethiopia"
      },
  watch: {
    textColor:"yellow",
    backgroundColor:"red",
    featuredPlaylistId:id
      }
    },
auditDetails: {
  overallGoodStanding:  true,
  communityGuidelinesGoodStanding:  true,
  copyrightStrikesGoodStanding:  true,
  contentIdClaimsGoodStanding:  true
    },
contentOwnerDetails: {
  contentOwner:"the team",
  timeLinked: Date.now()
    },
localizations: {
    
    title:"title",
    description:"description"
      
    }
 }).then(data =>{
   res.json({
     data
   })
 })

},

}     
      
 module.exports = authController
      