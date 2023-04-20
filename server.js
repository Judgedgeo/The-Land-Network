const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const cwd = process.cwd();
const connection = require('./config/connection');
const PORT = process.env.port || 3001;
const app = express();

var uri; // Define outside
if(process.env.ATLAS_URI){
  uri = process.env.ATLAS_URI; // Assign inside the block
  }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/', routes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });
  });