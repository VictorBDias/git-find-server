const express = require("express");
const cors = require("cors");
//const {uuid} = require('uuidv4');
//const db = require("./database/index.js");
const bodyParser = require("body-parser");
//const func = require('./controllers/authController');
const fs = require('fs'); 
const path = require('path'); 
//require('dotenv/config'); 


const app = express();
path1 = path.resolve(__dirname, "..", "src", "tmp", "uploads");
//console.log(path1);
const static = express.static(path1);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/files', static);


require('./controllers/authController')(app);
require('./controllers/reposController')(app);
//require('./controllers/imgController')(app);


app.listen(3333);
