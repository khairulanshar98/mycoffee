var uuid      = require('node-uuid');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Price      = require('./price');

var TxnSchema = new Schema({
    txn_id: {
          type: String,
          unique: true,
          default: uuid.v4()
    },
    txn_date: {
      type: Date,
      default: Date.now
    },
    person_name: {
      type: String
    },
    Lat: {
      type: Number
    },
    Long: {
      type: Number
    },
    ipaddress: {
      type: String
    }
});
module.exports = mongoose.model('Txn', TxnSchema);
