require("dotenv").config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/player');
var AdminRouter = require('./routes/admin');
var ArbitreRouter = require('./routes/arbitre');
var newsRouter = require('./routes/news');
var teamRouter = require('./routes/team');
var matchRouter = require('./routes/match');
var tournamentRouter = require('./routes/tournament');
var sportRouter = require('./routes/sport');
var notificationRouter = require('./routes/notification');
var complexeRouter = require('./routes/complexe');
var complexeOwnerRouter = require('./routes/complexeOwner');
var TerrainRouter = require('./routes/terrain');
var FavoriteRouter = require('./routes/favourite');
var viewRouter = require('./routes/view.js');
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
app.set("view engine", "jade")


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");
/////////////////swagger

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'SportPal App',
        version: 'V1.0',
        description: 'With Sportpal, find your pal',
    },
    host: 'sportpal-flutter.herokuapp.com',
    basePath: '/',
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./swag.yml'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


//Routes

//app.use('/', indexRouter);
app.use('/', viewRouter)
app.use('/complexeowner', complexeOwnerRouter);
app.use('/user', usersRouter);
app.use('/player', playerRouter);
app.use('/admin', AdminRouter);
app.use('/arbitre', ArbitreRouter);
app.use('/news', newsRouter);
app.use('/team', teamRouter);
app.use('/match', matchRouter);
app.use('/tournament', tournamentRouter);
app.use('/sport', sportRouter);
app.use('/notification', notificationRouter);
app.use('/complexe', complexeRouter); FavoriteRouter
app.use('/terrain', TerrainRouter);
app.use('/favorites', FavoriteRouter);
module.exports = app;
