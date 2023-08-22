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
    res.status(500).json({
      error: {
        code: 'DATABASE_ERROR',
        message: 'A database error occurred when saving a new record.',
        err,
      },
    });
  }
};
