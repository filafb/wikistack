const express = require('express');
const router = express.Router();
const addPageHTML = require('../views/addPage.js');
const main = require('../views/main.js');
const { db, Page, User } = require('../models/index.js');
const wikiPage = require('../views/wikipage.js')

//sending default layout
router.get('/', async (req, res, next) => {
  const pages = await Page.findAll()
  // console.log(pages[0].slug)
  res.send(main(pages));
})

router.post('/', async (req, res, next) => {
  try {
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
    //.findOrCreate returns an array with [instance (an obj), true or false, based on there was or not the value in the database]
  let [user, wasCreated] = await User.findOrCreate(
    {where: {
      name: `${name}`,
      email: `${email}`
    }
  })

  await user.save();

  const page = new Page({
    title: title,
    content: content,
    status: status,
  })

    await page.save();

    page.setAuthor(user);
    //to see in terminal the new added post
    console.log(`new Input:
    postId: ${page.id},
    userId: ${user.id},
    title: ${page.title},
    user: ${user.name},
    e-mail: ${user.email},
    content: ${page.content},
    status: ${page.status},
    created: ${page.createdAt}`);
    res.redirect(`/wiki/${page.slug}`);
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
    const user = await page.getAuthor();
    const wikiPageHTML =  wikiPage(page, user)
    res.send(wikiPageHTML)

  } catch (error){
    next(error)
  }
})

module.exports = router;
