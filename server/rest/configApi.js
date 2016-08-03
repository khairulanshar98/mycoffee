var express   = require('express');
var uuid      = require('node-uuid');
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
module.exports = function(app,Model,rest_name,id_attr) {
   var route = express.Router();
   // create a new {rest_name} (GET http://localhost:8080/{rest_name}/get)
   route.get('/api', function(req, res) {
     var token = getToken(req.headers);
     Model.find({}, function (err, results) {
       res.json(results);
     });
   });

   // create a new {rest_name} (GET http://localhost:8080/{rest_name}/get)
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
  // create a new {rest_name} (POST http://localhost:8080/{rest_name}/save)
  route.post('/api', function(req, res) {
    var token = getToken(req.headers);
    //console.log(rest_name, id_attr);
    if ((!req.body.name) && (!req.body.unit_price) ) {
      if (rest_name==='/price')
        return res.status(500).send({success: false, msg: 'Please pass Unit Price value.'});
      else
        return res.status(500).send({success: false, msg: 'Please pass Name value.'});
    } else {
      if ((!req.body[id_attr]) || req.body[id_attr] === null || req.body[id_attr]==='') {
          var data=req.body;
          data[id_attr]=uuid.v4();
          var record = new Model(data);
          record.save(function(err) {
            //console.log(JSON.stringify(err))
            if (err)
              return res.status(500).send({success: false, msg: err.errmsg});
            else
              res.json({success: true, msg: 'Successful created new record.',record:record});
          });
      }else{
          var data={};
          data[id_attr]=req.body[id_attr];
          //console.log(data);
          Model.findOne(data, function(err, record) {
            if (err) {
              return res.status(500).send({success: false, msg: err.errmsg});
            }else if (!record) {
              return res.status(500).send({success: false, msg: 'Data not found.'});
            } else {
              for (var key in req.body) {
                if (req.body.hasOwnProperty(key))
                   record[key]=req.body[key];
              }
              record.save(function(err) {
                 if (err)
                   res.json({success: false, msg: err.errmsg});
                 else
                   res.json({success: true, msg: 'Successful Updated.'});
               });
            }
          })
      }
    }
  });
  app.use(rest_name, route);
};
