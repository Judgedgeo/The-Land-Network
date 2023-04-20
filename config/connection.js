const mongoose = require("mongoose");
require('dotenv').config();

const url =process.env.ATLAS_URI


mongoose.connect('mongodb://127.0.0.1:27017/myapp');

module.exports = mongoose.connection;


// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string asnp a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally