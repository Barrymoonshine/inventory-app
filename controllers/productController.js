import Product from '../models/products.js';
import Category from '../models/categories.js';

const product_add = async (req, res) => {
  try {
    const result = await Category.find().sort({ createdAt: -1 });
    res.render('products/add-product', {
      categories: result,
      styles: 'products/add-product',
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

const product_get_view = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('products/product-details', {
      product,
      categories,
      styles: 'products/product-details',
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
    res.render('products/edit-product', {
      product,
      categories,
      styles: 'products/edit-product',
    });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

const product_get_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/delete-product', {
      product,
      styles: 'products/delete-product',
    });
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
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
};

const product_put = async (req, res) => {
  try {
    const updatedProd = {
      ...req.body,
      productImage: req.file.path,
    };
    delete updatedProd.password;
    await Product.findByIdAndUpdate(req.body._id, updatedProd);
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

export {
  product_add,
  product_get_view,
  product_get_edit,
  product_get_delete,
  product_delete,
  product_post,
  product_put,
};
