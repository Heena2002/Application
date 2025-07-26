const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('csv-parser');

router.get('/order-status/:id', (req, res) => {
  const { id } = req.params;
  let found = null;

  fs.createReadStream(__dirname + '/../data/order_items.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.order_id === id) {
        found = row;
      }
    })
    .on('end', () => {
      if (found) {
        res.json(found);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    });
});

module.exports = router;
