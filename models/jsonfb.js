const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

const jsonFSchema = new Schema({
    
  is_eligible_for_promotion: {type: Boolean},
  promotable_id: {type: String},
  id: {type:String}
  
  })
  module.exports = mongoose.model('Jsonad', jsonFSchema)