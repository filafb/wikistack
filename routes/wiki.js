const express = require('express');
const router = express.Router();
const addPageHTML = require('../views/addPage.js');
const layout = require('../views/layout.js');
const { db, Page, User } = require('../models/index.js');
const wikiPage = require('../views/wikipage.js')

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

  const page = new Page({
    title: title,
    content: content,
    status: status
  })

  try {
    await page.save();
    const log = await Page.findAll({
      where: {
        title: title,
        content: content,
        status: status
      }
    });
    console.log('this is what were trying to log', log[0].dataValues);
    res.redirect('/');
  }
  catch (error) {
    next(error)
  }
  // res.json(req.body); // to see how the body is returned
})

router.get('/add', (req, res, next) => {
  res.send(addPageHTML());
})

router.get('/:slug', async(req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const wikiPageHTML =  wikiPage(page)
    res.send(wikiPageHTML)

  } catch (error){
    next(error)
  }
})

module.exports = router;
