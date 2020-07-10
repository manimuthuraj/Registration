const express = require('express');
const app = express();
const db = require('./services/db');

db.intiConnection();

app.use('/user',require('./controllers/user'));

app.listen(3000,(err)=>{
  if(err) console.error(err);
  else console.log('Server on port 3000');
})