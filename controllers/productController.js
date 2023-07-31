import Product from '../models/products.js';

const product_get_view = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.render('edit-product', { product: result });
    })
    .catch((err) => {
      console.log(`Edit product error: ${err}`);
    });
};

const product_get_edit = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.render('edit-product', { product: result });
    })
    .catch((err) => {
      console.log(`Edit product error: ${err}`);
    });
};

const product_delete = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/dashboard' });
    })
    .catch((err) => {
      console.log(`Display product error: ${err}`);
    });
};

const product_post = (req, res) => {
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
};

const product_put = (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body)
    .then((result) => {
      res.json({ redirect: '/dashboard' });
    })
    .catch((err) => {
      console.log(`Edit product error: ${err}`);
    });
};

export {
  product_get_view,
  product_get_edit,
  product_delete,
  product_post,
  product_put,
};
