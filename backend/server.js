const express = require('express');
const cors = require('cors');
const app = express();

const topProductsRoute = require('./routes/topProducts');
const orderStatusRoute = require('./routes/orderStatus');
const stockCountRoute = require('./routes/stockCount');

app.use(cors());
app.use('/api', topProductsRoute);
app.use('/api', orderStatusRoute);
app.use('/api', stockCountRoute);

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});
