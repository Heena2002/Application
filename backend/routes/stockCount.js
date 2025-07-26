const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();

router.get('/stock/:productName', (req, res) => {
  const productName = decodeURIComponent(req.params.productName).toLowerCase();
  let count = 0;

  fs.createReadStream(__dirname + '/../data/inventory_items.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (
        row.product_name &&
        row.product_name.toLowerCase() === productName &&
        !row.sold_at // means still in stock
      ) {
        count++;
      }
    })
    .on('end', () => {
      res.json({
        product: productName,
        inStock: count,
        message: count > 0
          ? `There are ${count} '${req.params.productName}' left in stock.`
          : `No stock available for '${req.params.productName}'.`
      });
    });
});

module.exports = router;
