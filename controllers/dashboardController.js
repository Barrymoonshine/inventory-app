import Product from '../models/products.js';

const dashboard_get = async (req, res) => {
  try {
    const result = await Product.find().sort({
      createdAt: -1,
    });
    res.render('dashboard', { products: result, styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

const dashboard_post = async (req, res) => {
  try {
    const result = await Product.find({ name: req.body.search }).sort({
      createdAt: -1,
    });
    res.render('dashboard', { products: result, styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

export { dashboard_get, dashboard_post };
