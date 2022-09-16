require('dotenv').config();

var Main = require('./src/Main'),
  client = new Main({ token: process.env.TOKEN });

client.initialize();
