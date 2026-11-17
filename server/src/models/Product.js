import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
    },
    // We will store image URLs from Cloudinary here later
    images: {
      type: [String],
      required: [true, 'Please add at least one image'],
    },
    coverImage: {
      type: String,
      required: [true, 'Please specify a cover image'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please add an original price'],
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please add a selling price'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true, // By default, new products show on the website
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt dates
  }
);

// This is a virtual property. It calculates the discount percentage automatically!
productSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice > this.sellingPrice) {
    return Math.round(((this.originalPrice - this.sellingPrice) / this.originalPrice) * 100);
  }
  return 0;
});

// Make sure virtuals are included when we convert to JSON (for the frontend)
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;