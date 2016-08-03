var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SizeSchema = new Schema({
    size_id: {
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


module.exports = mongoose.model('Size', SizeSchema);
