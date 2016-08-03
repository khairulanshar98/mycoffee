var express   = require('express');
var uuid      = require('node-uuid');
var Txn       = require('../models/transaction');
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = function(app) {
   var route = express.Router();
  // create a new (POST http://localhost:8080/txn/save)
  route.post('/api', function(req, res) {
    var token = getToken(req.headers);
    var Txn = new Txn(req.body);
    Txn.save(function(err) {
      //console.log(JSON.stringify(err))
      if (err)
        return res.status(500).send({success: false, msg: err.errmsg});
      else
        res.json({success: true, msg: 'Successful created new record.'});
    });
  });
  // create a new (GET http://localhost:8080/txn/get)
  route.get('/api', function(req, res) {
    var token = getToken(req.headers);
    Txn.find({}, function (err, results) {
      res.json(results);
    });
  });
  route.get('/api/:attr_name/:attr_value', function(req, res) {
    var token = getToken(req.headers);
    var attr_name = req.params.attr_name;
    var attr_value = req.params.attr_value;
    var data={};
    data[attr_name]=attr_value;
    Model.find({data}, function (err, results) {
      res.json(results);
    });
  });
  app.use('/txn', route);
};
