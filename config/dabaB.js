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

      }


     




module.exports = (mongo,dataBase);