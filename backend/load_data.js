const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')

// Models
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
console.log('Connected to MongoDB')

// Generic CSV Loader Function
const loadCSV = (path, model, transformFn = (row) => row) => {
  return new Promise((resolve, reject) => {
    const items = []
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => {
        items.push(transformFn(row))
      })
      .on('end', async () => {
        try {
          await model.insertMany(items)
          console.log(`Loaded: ${path}`)
          resolve()
        } catch (err) {
          console.error(`Error loading ${path}:`, err)
          reject(err)
        }
      })
  })
}

const runImport = async () => {
  try {
    await mongoose.connection.dropDatabase()

    await loadCSV('./data/products.csv', Product, (row) => ({
      ...row,
      cost: Number(row.cost),
      retail_price: Number(row.retail_price),
      distribution_center_id: Number(row.distribution_center_id)
    }))

    await loadCSV('./data/orders.csv', Order, (row) => ({
      ...row,
      order_id: Number(row.order_id),
      user_id: Number(row.user_id),
      num_of_item: Number(row.num_of_item),
      created_at: new Date(row.created_at),
      shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
      delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
      returned_at: row.returned_at ? new Date(row.returned_at) : null
    }))

    await loadCSV('./data/order_items.csv', OrderItem, (row) => ({
      ...row,
      order_id: Number(row.order_id),
      user_id: Number(row.user_id),
      product_id: Number(row.product_id),
      inventory_item_id: Number(row.inventory_item_id),
      created_at: new Date(row.created_at),
      shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
      delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
      returned_at: row.returned_at ? new Date(row.returned_at) : null
    }))

    console.log('All CSVs imported successfully')
    process.exit()
  } catch (err) {
    console.error('Error in import:', err)
    process.exit(1)
  }
}

runImport()
