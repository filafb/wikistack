const express = require('express');
const router = express.Router();
const addPageHTML = require('../views/addPage.js');
const layout = require('../views/layout.js');

//sending default layout
router.get('/', (req, res, next) => {
  res.send(layout());
})

router.post('/', (req, res, next) => {
  res.json(req.body);
})

router.get('/add', (req, res, next) => {
  res.send(addPageHTML());
})


module.exports = router;
