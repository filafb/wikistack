const express = require('express');
const { db } = require('./models');
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

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
