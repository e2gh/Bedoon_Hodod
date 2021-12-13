/*jshint esversion:6*/
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ // data base record
  user_name: {
    type: String,
    unique: false,
    required: true,
  },
  user_email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  user_password: {
    type: String,
    unique: false,
    required: true,
  },
  User_Membership_Type: {
    type: String,
    default: "Buyer",
  },
});

module.exports = mongoose.model('User', userSchema);
