'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let friendsSchema = new Schema();

friendsSchema.add({
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  countryCode: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: ""
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date,
  },
  userName: {
    type: String,
    default: ''
  },
  friends: {
    type: [friendsSchema],
    default: []
  },
  // sentRequests:{
  //   type:[friendsSchema],
  //   default:[]
  // },
  // recievedRequests:{
  //   type:[friendsSchema],
  //   default:[]
  // }

})


mongoose.model('User', userSchema);