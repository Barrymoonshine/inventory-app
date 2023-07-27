import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

// Set up Express app
const app = express();

// Connect to mongoDB
const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

// Listen for requests
mongoose
  .connect(dbURI)
  // Only listen for requests after connecting to database
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Middleware
app.use(express.static('public'));

// Register View Engine (EJS)
app.set('view engine', 'ejs');

// Render views
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/add-product', (req, res) => {
  res.render('add-product');
});

app.get('/add-category', (req, res) => {
  res.render('add-category');
});
