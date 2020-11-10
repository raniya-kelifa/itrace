const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = mongoose.Schema

const channelSchema = new Schema({
kind: {type:String},
etag: {type:String},
id: {type:String},
snippet: {
  title:{type:String},
  description:{type:String},
  customUrl:{type:String},
  publishedAt: {type:String},
  thumbnails: {   
      url: {type:String},
      width: {type:Number},
      height: {type:Number}
      },
  defaultLanguage: {type:String},
  localized: {
    title: {type:String},
    description: {type:String},
      },
  country: {type:String}
    },
contentDetails: {
  relatedPlaylists: {
    likes: {type:String},
    favorites:{type:String},
    uploads:{type:String}
      }
    },
statistics: {
  viewCount:{type:Number},
  subscriberCount:{type:Number},  // this value is rounded to three significant figures
  hiddenSubscriberCount: {type: {type:Boolean}},
  videoCount:{type:Number}
    },
topicDetails: {
  topicIds: [
       {type:String}
      ],
  topicCategories: [
       {type:String}
      ]
    },
status: {
  privacyStatus:{type:String},
  isLinked:  {type:Boolean},
  longUploadsStatus:{type:String},
  madeForKids:  {type:Boolean},
  selfDeclaredMadeForKids:  {type:Boolean}
    },
brandingSettings: {
  channel: {
    title:{type:String},
    description:{type:String},
    keywords:{type:String},
    defaultTab:{type:String},
    trackingAnalyticsAccountId:{type:String},
    moderateComments:  {type:Boolean},
    showRelatedChannels:  {type:Boolean},
    showBrowseView:  {type:Boolean},
    featuredChannelsTitle:{type:String},
    featuredChannelsUrls: [
         {type:String}
        ],
    unsubscribedTrailer:{type:String},
    profileColor:{type:String},
    defaultLanguage:{type:String},
    country:{type:String}
      },
  watch: {
    textColor:{type:String},
    backgroundColor:{type:String},
    featuredPlaylistId:{type:String}
      }
    },
auditDetails: {
  overallGoodStanding:  {type:Boolean},
  communityGuidelinesGoodStanding:  {type:Boolean},
  copyrightStrikesGoodStanding:  {type:Boolean},
  contentIdClaimsGoodStanding:  {type:Boolean}
    },
contentOwnerDetails: {
  contentOwner:{type:String},
  timeLinked: {type:Date}
    },
localizations: {
    
    title:{type:String},
    description:{type:String}
      
    }
  
})
module.exports = mongoose.model('channel', channelSchema)