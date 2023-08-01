import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define schema
const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const Category = mongoose.model('Categories', categoriesSchema);

export default Category;
