const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  product_id: Number,
  created_at: Date,
  sold_at: Date,
  cost: Number,
  product_category: String,
  product_name: String,
  product_brand: String,
  product_retail_price: Number,
  product_department: String,
  product_sku: String,
  product_distribution_center_id: Number
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
