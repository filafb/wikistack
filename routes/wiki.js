const express = require('express');
const router = express.Router();
const addPageHTML = require('../views/addPage.js');
const layout = require('../views/layout.js');
const { db, Page, User } = require('../models/index.js');

//sending default layout
router.get('/', (req, res, next) => {
  res.send(layout());
})

router.post('/', async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const slug = title.replace(" ", "-")

  const page = new Page({
    title: title,
    content: content,
    status: status,
    slug: slug
  })

  try {
    await page.save();
    res.redirect('/');
  }
  catch(error) {
    next(error)
  }
  // res.json(req.body); // to see how the body is returned
})



router.get('/add', (req, res, next) => {
  res.send(addPageHTML());
})


module.exports = router;
