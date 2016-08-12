var express     = require('express');
var path        = require('path');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var favicon     = require('serve-favicon');
var mongoose    = require('mongoose');
var config      = require('./server/config/database');
var Category    = require('./server/models/category');
var Size        = require('./server/models/size');
var Product     = require('./server/models/product');
var Price       = require('./server/models/price');
var port 	      = process.env.PORT || 5000;
//var passport	  = require('passport');
//var jwt 			  = require('jwt-simple');

// gzip/deflate outgoing responses
var compression = require('compression');
//var bytes = require('bytes');
app.use(compression({threshold:'200B'}));

//configure app
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"client/views"));

// log to console
app.use(morgan('dev'));

// favicon
app.use(favicon(path.join(__dirname,'client/images/favicon.ico')));

// get our request parameters
app.use(express.static(path.join(__dirname,'bower_components/bootstrap/dist')));
app.use(express.static(path.join(__dirname,'bower_components/jquery/dist')));
app.use(express.static(path.join(__dirname,'bower_components/angular')));
app.use(express.static(path.join(__dirname,'bower_components/angular-route')));
app.use(express.static(path.join(__dirname,'bower_components/angular-resource')));
app.use(express.static(path.join(__dirname,'bower_components/components-font-awesome')));
app.use(express.static(path.join(__dirname,'bower_components/ngprogress')));
app.use(express.static(path.join(__dirname,'bower_components/poly')));
app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
//app.use(passport.initialize());

//set default page
app.get('/', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=31557600');
  res.render('pages/index');
});
app.get('/angular', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=31557600');
  res.render('pages/angular');
});
app.get('/polymer', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=31557600');
  res.render('pages/polymer');
});
// connect to database
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://mycoffee:M17082016c@ds029655.mlab.com:29655/heroku_shjnxsr5';
//uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.database;
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
// pass passport for configuration
//require('./config/passport')(passport);

// RESTApi
require('./server/rest/configApi')(app,Category,'/category','cat_id');
require('./server/rest/configApi')(app,Size,'/size','size_id');
require('./server/rest/configApi')(app,Product,'/product','item_id');
require('./server/rest/configApi')(app,Price,'/price','price_id');
require('./server/rest/txnApi')(app);

// Start the server
app.listen(port);
console.log('My Coffee and Tea is running on :' + port);
