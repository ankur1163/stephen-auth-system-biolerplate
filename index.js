const express = require('express');
const http=require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app= express();
const router = require("./router");
const mongoose = require("mongoose");
var t=18;

//db setup

mongoose.connect("mongodb://ankur1163:lightbulb1@ds013946.mlab.com:13946/ank1163");

//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);


//server setup
const port = process.env.PORT||3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening",port);
