const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

const jsonYTSchema = new Schema({
    
    id: {type: String},
    kind: {type:String},
    etag: {type:String},
    contentDetails: {
      relatedPlaylists: {
        likes: {type:String},
        favorites: {type:String},
        watchHistory: {type:String},
        watchLater: {type:String}}

    },
  
  })
  module.exports = mongoose.model('JsonYT', jsonYTSchema)