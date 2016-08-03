var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var PriceHistorySchema = new Schema({
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
    price_id: {
          type: String,
          required: true
    },
    unit_price: {
          type: Number,
          required: true
    },
    updated_date: {
      type: Date,
      default: Date.now
    }
});
module.exports = mongoose.model('PriceHistory', PriceHistorySchema);
