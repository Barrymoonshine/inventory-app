import express from 'express';
import Product from '../models/products.js';

// Set up an Express router, router has to be used inside an app
const routes = express.Router();

// Display product
routes.get('/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.render('product-details', { product: result });
    })
    .catch((err) => {
      console.log(`Display product error: ${err}`);
    });
});

// Go to edit product page
routes.get('/edit-product/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.render('edit-product', { product: result });
    })
    .catch((err) => {
      console.log(`Edit product error: ${err}`);
    });
});

// Delete product
routes.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/dashboard' });
    })
    .catch((err) => {
      console.log(`Display product error: ${err}`);
    });
});

// Add new product to DB
routes.post('/', (req, res) => {
  const inStockBoolean = req.body.inStock === 'on';
  const product = new Product({ ...req.body, inStock: inStockBoolean });
  product
    .save()
    .then((result) => {
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.log(`Mongo DB add to DB error: ${err}`);
    });
});

// Edit product in DB
routes.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body)
    .then((result) => {
      res.json({ redirect: '/dashboard' });
    })
    .catch((err) => {
      console.log(`Edit product error: ${err}`);
    });
});

export default routes;
