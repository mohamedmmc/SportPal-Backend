require("dotenv").config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
var cors = require("cors");





//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/player');
var ComplexeOwnerRouter = require('./routes/complexeOwner');
var AdminRouter = require('./routes/admin');
var ArbitreRouter = require('./routes/arbitre');
var newsRouter = require('./routes/news');
var teamRouter = require('./routes/team');
var matchRouter = require('./routes/match');
var tournamentRouter = require('./routes/tournament');
var notificationRouter = require('./routes/notification');
var sportRouter = require('./routes/sport');
var complexeRouter = require('./routes/sport');
var TerrainRouter = require('./routes/sport');
var FavoriteRouter = require('./routes/favourite');

var app = express();

//connexion DB
mongoose.connect(process.env.DB, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once('open', () => console.log("Connected to DB"))


//for local db use mongodb://localhost:27017/sportpal

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

//Routes

//app.use('/', indexRouter);
app.use(cors());
app.use('/user', usersRouter);
app.use('/player', playerRouter);
app.use('/complexeOwner', ComplexeOwnerRouter);
app.use('/admin', AdminRouter);
app.use('/arbitre', ArbitreRouter);
app.use('/news', newsRouter);
app.use('/team', teamRouter);
app.use('/match', matchRouter);
app.use('/tournament', tournamentRouter);
app.use('/sport', sportRouter);
app.use('/notification', notificationRouter);
app.use('/complexe', complexeRouter);
app.use('/terrain', TerrainRouter);
app.use('/favorites', FavoriteRouter);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    res.header(
        'Access-Control-Expose-Headers',
        'token'
    );
    next();
});



app.get('/', function (req, res, next) {
    // Handle the get for this route
});

app.post('/', function (req, res, next) {
    // Handle the post for this route
});


module.exports = app;
