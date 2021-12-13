/*jshint esversion:8*/
const express = require('express');
const router = express.Router();


// All Seller Route
router.get('/', async (req, res) => {
      res.render('aboutus/index', { title: 'عن الموقع | بدون حدود'});
});
// New Seller Route
//router.get('/signip', (req, res) => {
//  res.render('sellersignup', { title: 'كن مطورًا | بدون حدود'});
//});
module.exports = router;
