/*jshint esversion:8*/
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
      res.render('policy/index', { title: 'عن الموقع | بدون حدود'});
});

module.exports = router;
