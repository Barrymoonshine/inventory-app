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

// Product routes
app.get('/products', (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('dashboard', { products: result });
    })
    .catch((err) => {
      console.log(`Mongoose find error: ${err}`);
    });
});

app.get('/add-product', (req, res) => {
  res.render('add-product');
});

app.post('/products', (req, res) => {
  const inStockBoolean = req.body.inStock === 'on';
  console.log('req.body', req.body);
  console.log('inStockBoolean', inStockBoolean);
  console.log({ ...req.body, inStock: inStockBoolean });
  // const product = new Product(req.body);
  // product
  //   .save()
  //   .then((result) => {
  //     res.redirect('/blogs');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
