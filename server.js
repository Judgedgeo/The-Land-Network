const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cwd = process.cwd();
const connection = require('./config/connection');
const PORT = process.env.port || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static());
app.use('/', routes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });
  });