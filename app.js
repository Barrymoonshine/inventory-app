import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/products.js';
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
  res.render('index');
});

app.get('/dashboard', async (req, res) => {
  try {
    const result = await Product.find().sort({ createdAt: -1 });
    res.render('dashboard', { products: result });
  } catch (err) {
    console.log(`Mongoose find error: ${err}`);
  }
});

app.get('/add-product', (req, res) => {
  res.render('add-product');
});

app.get('/add-category', (req, res) => {
  res.render('add-category');
});
