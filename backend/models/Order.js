const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: Number,
  user_id: Number,
  status: String,
  gender: String,
  created_at: Date,
  returned_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  num_of_item: Number
});

module.exports = mongoose.model('Order', orderSchema);
