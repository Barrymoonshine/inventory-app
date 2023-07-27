import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define schema
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalValue: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const Products = mongoose.model('Products', productsSchema);

export default Products;