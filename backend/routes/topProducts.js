const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

router.get('/top-products', (req, res) => {
  const productCounts = {};
  fs.createReadStream(__dirname + '/../data/order_items.csv')
    .pipe(csv())
    .on('data', (row) => {
      const id = row.product_id;
      productCounts[id] = (productCounts[id] || 0) + 1;
    })
    .on('end', () => {
      const sorted = Object.entries(productCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const result = [];

      fs.createReadStream(__dirname + '/../data/products.csv')
        .pipe(csv())
        .on('data', (row) => {
          sorted.forEach(([id, count]) => {
            if (row.id === id) {
              result.push({ id: row.id, name: row.name, brand: row.brand, sold: count });
            }
          });
        })
        .on('end', () => res.json(result));
    });
});
module.exports = router;
