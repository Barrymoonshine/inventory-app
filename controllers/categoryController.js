import Category from '../models/categories.js';

export const category_add = async (req, res) => {
  res.render('add-category', { styles: 'add-category', script: null });
};

export const category_post = async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
};
