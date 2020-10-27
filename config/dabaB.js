var mongo = require('mongoose');
const { db } = require('../models/user');
var userSchema =  require('../models/user');
var userModel = require('../models/user')
var url =' mongodb://localhost:27017/itraceUsers'

mongo.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("MongoDB connected successfully to server")
});


const dataBase ={
  userRegistration:(data)=>{
  db.collection('itraceUser').insertOne(data,(err, res)=>{
      if(err){
        console.log(err)
      }
        else
      console.log('User Registerd successfully!');
      db.close();
   });

  },

replacePassword:async (email,passwd)=>{
  try {
   users = await db.collection('itraceUser').findOne({email:email});
    
 userModel.create({
      username:users.username,
      email:users.email,
      password : passwd
 }).then(data =>{
   console.log(data)
   console.log(users)
 db.collection('itraceUser').findAndModify(data);
 })
        console.log('replaced')
      }catch (error) {
       console.log(error)
       db.close()
      }

},

      }


     




module.exports = (mongo,dataBase);