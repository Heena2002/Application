const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('DistributionCenter', centerSchema);
