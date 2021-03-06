const mongoose = require('mongoose');

const travelInfoSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true},
  imagePath: { type: String, required: true },
  creator: { type: String, required: true }
});

module.exports = mongoose.model('TravelInfo', travelInfoSchema);