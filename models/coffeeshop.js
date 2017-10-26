var mongoose = require("mongoose");

var coffeeshopSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Coffeeshop", coffeeshopSchema);
