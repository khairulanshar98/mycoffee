var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var TxnSchema = new Schema({
    txn_id: {
          type: String,
          required: true
    },
    txn_date: {
      type: Date,
      default: Date.now
    },
    cat_id: {
        type: String,
        required: true
    },
    cat_name: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    size_id: {
        type: String,
        required: true
    },
    size_name: {
        type: String,
        required: true
    },
    hot_cold: {
        type: String,
        required: true
    },
    price_id: {
          type: String,
          unique: true,
          required: true
    },
    unit_price: {
          type: Number,
          required: true
    },
    quantity: {
          type: Number,
          required: true
    },
    amount: {
          type: Number,
          required: true
    }
});
module.exports = mongoose.model('Txn', TxnSchema);
