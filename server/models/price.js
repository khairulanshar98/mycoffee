var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Product      = require('./product');
var Size         = require('./size');
var PriceHistory = require('./price_history');


var PriceSchema = new Schema({
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
    }
});

function ProductNotFound() {
  this.name = 'ProductNotFound';
  this.errmsg = 'Product not found.';
  this.stack = (new Error()).stack;
}
ProductNotFound.prototype = Object.create(Error.prototype);
ProductNotFound.prototype.constructor = ProductNotFound;

function SizeNotFound() {
  this.name = 'SizeNotFound';
  this.errmsg = 'Size not found.';
  this.stack = (new Error()).stack;
}
SizeNotFound.prototype = Object.create(Error.prototype);
SizeNotFound.prototype.constructor = SizeNotFound;


PriceSchema.pre('save', function (next) {
    var price = this;
    Product.findOne({item_id:price.item_id}, function(err, recordProduct) {
      if (err) {
          return next(err);
      }else if (!recordProduct) {
           return next(new ProductNotFound());
      } else {
        Size.findOne({size_id:price.size_id}, function(err, recordSize) {
          if (err) {
              return next(err);
          }else if (!recordSize) {
               return next(new SizeNotFound());
          } else {
            var dataHistory={};
            dataHistory.item_id=price.item_id;
            dataHistory.item_name=price.item_name;
            dataHistory.size_id=price.size_id;
            dataHistory.size_name=price.size_name;
            dataHistory.price_id=price.price_id;
            dataHistory.unit_price=price.unit_price;
            var pricehistory = new PriceHistory(dataHistory);
            pricehistory.save(function(err) {
              if (err)
                return next(err);
              else
                next();
            });
          }
        });
      }
    });
});


module.exports = mongoose.model('Price', PriceSchema);
