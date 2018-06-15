const express = require('express');
const { db, Page, User } = require('./models');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout.js');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.get('/', (req, res, next) => {
  res.send(layout());
})

const PORT = 3000;

const dbSync = async () =>{
  await db.sync({force:true}); // // this drops all tables then recreates them based on our JS definitions // used for dev mode, not for production
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

dbSync();

