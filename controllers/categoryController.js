import Category from '../models/categories.js';

const category_add = async (req, res) => {
  res.render('/add-category', { styles: 'add-category' });
};

const category_post = async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.redirect('/dashboard', { styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
};

export { category_add, category_post };
