import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.wym9xjg.mongodb.net/?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(dbURI);
    app.listen(3000, '0.0.0.0', () => {
      console.log('Server is listening on port 3000');
    });
  } catch (err) {
    console.log(`Mongoose connection error: ${err}`);
  }
};
connectToDb();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/products', productRoutes);
app.use('/add-category', categoryRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.render('home', { styles: 'home', script: null });
});

app.use((req, res) => {
  res.status(404).render('404', { styles: '404', script: null });
});
