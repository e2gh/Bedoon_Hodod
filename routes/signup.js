/*jshint esversion:8*/
const alert = require('alert-node');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const User = require("../models/user.js");


router.get('/', async (req, res) => {
      res.render('signup/index', {title: 'تسجيل عضوية | بدون حدود'});
});

// database Schema
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

//use sessions for tracking logins
router.use(session({
  secret: 'signin',
  resave: true,
  saveUninitialized: true,
}));


router.get('/', function(req, res) {
    res.render('signup', { title:'التسجيل | بدون حدود'});
});

router.post("/", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      console.log("user saved to database");
      alert('تم التسجيل، انتقل لصفحة تسجيل الدخول لتسجل دخولك.');
      return res.redirect('/');
    })
    .catch(err => {
      console.log("Unable to save to database");
      alert('البريد الإلكتروني مسجّل مُسبقًا!.');
      return res.redirect('/signup');
    });
});

module.exports = router;
