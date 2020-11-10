const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String },
  archived: { type: Boolean, default: false },
  created_at: { type: Date },
})

UserSchema.pre('save', function preSave(next) {
    let model = this

    UserSchema.statics.hashPasswd(model.password, (err, hash) => {
        model.password = hash
        next()
    })
})


UserSchema.methods.verifyPassword = function verifyPassword(passwd) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwd, this.password, (err, isMatch) => {
        if (err) {
          return reject(err)
        }
  
        resolve(isMatch)
      })
    })
  }
  
UserSchema.statics.hashPasswd = function(passwd, cb) {
    let createHash = (err, hash) => {
      if (err) {
        return cb(err)
      }
  
      cb(null, hash)
    }
  
    let generateSalt = (err, salt) => {
      if (err) {
        return cb(err)
      }
  
      // Hash the password using the generated salt
      bcrypt.hash(passwd, salt, createHash)
    }
  
    // Generate a salt factor
    bcrypt.genSalt(12, generateSalt) // 123123123sdf
  }

  module.exports = mongoose.model('Users', UserSchema)