const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

const jsonfbSchema = new Schema({
    
        created_time: {type:Date},
        message: {type:String},
        id: {type:String}
  })
  module.exports = mongoose.model('Json', jsonfbSchema)