import Product from '../models/products.js';

export const dashboard_get = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.render('dashboard', {
      products,
      styles: 'dashboard',
      script: null,
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

export const dashboard_post = async (req, res) => {
  try {
    const products = req.body.search
      ? await Product.find({
          $or: [
            { name: { $regex: req.body.search, $options: 'i' } },
            { sku: { $regex: req.body.search, $options: 'i' } },
            { category: { $regex: req.body.search, $options: 'i' } },
          ],
        }).sort({
          createdAt: -1,
        })
      : await Product.find().sort({
          createdAt: -1,
        });
    res.render('dashboard', {
      products,
      styles: 'dashboard',
      script: null,
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};
