require('dotenv').config({ path: './backend/.env' });
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
connectToMongo();
var app = express();
const port = 5000
app.use(cors())
app.use(express.json())

app.use('/auth',require('./router/auth'));
app.use('/note',require('./router/note'));

app.listen(port, () => {
  console.log(`Cloudbook backend listening on port ${port}`)
})
