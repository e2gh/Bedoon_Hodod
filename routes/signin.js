/*jshint esversion:8*/
const alert = require('alert-node');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const router = express.Router();
//const session = require('express-session');
const User = require("../models/user.js");



router.get('/', async (req, res) => {
      res.render('signin/index', { title: 'تسجيل الدخول | بدون حدود'});
});

// database Schema
var userSchema = new mongoose.Schema({ // data base record
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
});

//use sessions for tracking logins
router.use(session({
  secret: 'signin',
  resave: true,
  saveUninitialized: true,
}));

// find the user to sign in
router.post('/', function(req, res) {
  User.findOne({ user_email: req.body.user_email, user_password: req.body.user_password })
    .exec(function (err, user) {
       if (!user) {
          alert("البريد الإلكتروني غير مُسجّل أو كلمة المرور خاطئة");
          return res.redirect('/signin');
        } else {
        alert("تم تسجيل دخولك.");
        req.session.userId = user._id;
        return res.redirect('/profile');
      //return res.send('<h1>Name: </h1>' + user.user_name + '<h2>Mail: </h2>' + user.user_email + '<br><a type="button" href="/logout">Logout</a>');
}
      });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
