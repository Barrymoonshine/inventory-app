import express from 'express';

// Set up Express app
const app = express();

// Listen for requests
app.listen(3000);

// Middleware & static files
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
