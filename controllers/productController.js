import Product from '../models/products.js';
import Category from '../models/categories.js';

export const product_add = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('products/add-product', {
      categories,
      styles: 'products/add-product',
      script: 'add-product',
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

export const product_get_view = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('products/product-details', {
      product,
      categories,
      styles: 'products/product-details',
      script: null,
    });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

export const product_get_edit = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const categories = await Category.find().sort({ createdAt: -1 });
    res.render('products/edit-product', {
      product,
      categories,
      styles: 'products/edit-product',
      script: 'edit-product',
    });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

export const product_get_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/delete-product', {
      product,
      styles: 'products/delete-product',
      script: 'delete-product',
    });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};

export const product_delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Display product error: ${err}`);
  }
};

export const product_post = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      productImage: req.file.path,
    });
    await product.save();
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
};

export const product_put = async (req, res) => {
  try {
    const updatedProd = {
      ...req.body,
      productImage: req.file.path,
    };
    // Password added to req.body for validation, but not needed in DB
    delete updatedProd.password;
    await Product.findByIdAndUpdate(req.body._id, updatedProd);
    res.json({ redirect: '/dashboard' });
  } catch (err) {
    console.log(`Edit product error: ${err}`);
  }
};
