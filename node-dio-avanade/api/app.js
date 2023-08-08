var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//MongoDB
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/availability', require("./routes/availabilityRoute"));
app.use('/reserve', require("./routes/reservationRoute"));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ =>{
    console.log("Conectado com o banco");
})

module.exports = app;
