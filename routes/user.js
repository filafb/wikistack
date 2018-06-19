const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models/index.js');
const userList = require('../views/userList.js')
const pageUser = require('../views/userPages.js')


router.get("/", async (req,res,next) =>{
  try{
    const users = await User.findAll()
    res.send(userList(users))
  }catch (error){
    next(error)
  }
})

router.get("/:id", async (req,res,next)=>{
  try{
    const userId = req.params.id;
    const user = await User.findById(userId)
    const pagesByUser = await Page.findAll({where: {authorId: userId}})
    res.send(pageUser(user,pagesByUser))
  }catch(error){
    next(error)
  }
})















module.exports = router;

