const express = require('express');
const { db, Page, User } = require('./models');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout.js');
const wikiRouter = require('./routes/wiki.js');
// const user = require('./routes/user.js');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);

db.authenticate().
then(() => {
  console.log('connected to the database');
})

//this redirects to /wiki - provided by FS
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

const PORT = 3000;

const dbSync = async () =>{
  await db.sync({force:true}); // // this drops all tables then recreates them based on our JS definitions // used for dev mode, not for production
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

dbSync();

