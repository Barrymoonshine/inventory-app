import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/products.js';
import Category from './models/categories.js';
import productRoutes from './routes/productRoutes.js';

// Set up Express app
const app = express();

const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

// Connect to mongoDB and listen for requests
const connectToDb = async () => {
  try {
    await mongoose.connect(dbURI);
    app.listen(3000);
  } catch (err) {
    console.log(`Mongoose connection error: ${err}`);
  }
};

connectToDb();

// Register view engine (EJS)
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', productRoutes);

// Render views
app.get('/', (req, res) => {
  res.render('index', { styles: 'index' });
});

app.get('/dashboard', async (req, res) => {
  try {
    const result = await Product.find().sort({
      createdAt: -1,
    });
    res.render('dashboard', { products: result, styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
});

app.post('/dashboard', async (req, res) => {
  try {
    const result = await Product.find({ name: req.body.search }).sort({
      createdAt: -1,
    });
    res.render('dashboard', { products: result, styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
});

app.get('/add-product', async (req, res) => {
  try {
    const result = await Category.find().sort({ createdAt: -1 });
    res.render('add-product', { categories: result, styles: 'add-product' });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
});

app.get('/add-category', (req, res) => {
  res.render('add-category', { styles: 'add-category' });
});

app.post('/categories', async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.redirect('/dashboard', { styles: 'dashboard' });
  } catch (err) {
    console.log(`Mongo DB add to DB error: ${err}`);
  }
});

app.use((req, res) => {
  res.status(404).render('404', { styles: 'dashboard' });
});
