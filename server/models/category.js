var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
    cat_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
          type: String,
          unique: true,
          required: true
    }
});





module.exports = mongoose.model('Category', CategorySchema);
