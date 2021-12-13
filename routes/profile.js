/*jshint esversion:8*/
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
      res.render('profile/index', { title: 'عن الموقع | بدون حدود'});
});

module.exports = router;
