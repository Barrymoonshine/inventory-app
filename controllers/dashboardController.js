import Product from '../models/products.js';

const dashboard_get = async (req, res) => {
  try {
    const result = await Product.find().sort({
      createdAt: -1,
    });
    res.render('dashboard', {
      products: result,
      styles: 'dashboard',
      script: null,
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

const dashboard_post = async (req, res) => {
  try {
    const result = req.body.search
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
      products: result,
      styles: 'dashboard',
      script: null,
    });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
};

export { dashboard_get, dashboard_post };
