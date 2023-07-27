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
  const product = new Product(req.body);
  product
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`Mongoose save error: ${err}`);
    });
});

app.get('/add-category', (req, res) => {
  res.render('add-category');
});
