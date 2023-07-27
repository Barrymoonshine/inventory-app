import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/products.js';

// Set up Express app
const app = express();

// Connect to mongoDB
const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

// Listen for requests
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(`Mongoose connection error: ${err}`));

// Register view engine (EJS)
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Render views
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/add-product', (req, res) => {
  const product = new Product({
    name: 'bic cristal ballpoint',
    sku: 'B004DBHR2Q',
    description: 'Medium point pens, pack of ten',
    cost: 1.5,
    quantity: 10,
    inStock: true,
    category: 'stationary',
  });
  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`Mongoose save error: ${err}`);
    });
});

app.get('/dashboard', (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('dashboard', { products: result });
    })
    .catch((err) => {
      console.log(`Mongoose find error: ${err}`);
    });
});
