import Product from '../models/products.js';
import Category from '../models/categories.js';

const product_get_view = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('product-details', {
      product,
      categories,
      styles: 'product-details',
    });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

const product_get_edit = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('edit-product', { product, categories, styles: 'edit-product' });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

const product_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Display product error: ${err}`);
  }
};

const product_post = async (req, res) => {
  try {
    const inStockBoolean = req.body.inStock === 'on';
    const product = new Product({
      ...req.body,
      inStock: inStockBoolean,
      productImage: req.file.path,
    });
    await product.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
};

const product_put = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.body._id, req.body);
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

export {
  product_get_view,
  product_get_edit,
  product_delete,
  product_post,
  product_put,
};
