var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var Category  = require('./category');


var ProductSchema = new Schema({
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
          unique: true,
          required: true
    },
    name: {
          type: String,
          unique: true,
          required: true
    },
    start_rate: {
          type: Number,
          default:0
    },
    comments: {
          type: Number,
          default:0
    },
    number_of_order: {
          type: Number,
          default:0
    },
    total_amount: {
          type: Number,
          default:0
    }
});

function CategoryNotFound() {
  this.name = 'CategoryNotFound';
  this.errmsg = 'Category not found.';
  this.stack = (new Error()).stack;
}
CategoryNotFound.prototype = Object.create(Error.prototype);
CategoryNotFound.prototype.constructor = CategoryNotFound;


ProductSchema.pre('save', function (next) {
    var product = this;
    Category.findOne({cat_id:product.cat_id}, function(err, record) {
      if (err) {
          return next(err);
      }else if (!record) {
           return next(new CategoryNotFound());
      } else {
          next();
      }
    });
});


module.exports = mongoose.model('Product', ProductSchema);
