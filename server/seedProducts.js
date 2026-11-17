import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

const products = [
  {
    name: "The Zara Emerald Suit",
    description: "A beautiful red bridal lehenga with intricate gold embroidery.",
    category: "Bridal",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"],
    coverImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    originalPrice: 45000,
    sellingPrice: 38000,
    isNewArrival: true,
    isPublished: true
  },
  {
    name: "Ivory Chikankari Kurta",
    description: "Elegant ivory kurta with traditional Lucknowi hand embroidery.",
    category: "Everyday",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"],
    coverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    originalPrice: 12500,
    sellingPrice: 12500,
    isNewArrival: false,
    isPublished: true
  },
  {
    name: "Midnight Velvet Lehenga",
    description: "Regal midnight blue velvet lehenga for festive occasions.",
    category: "Festive",
    images: ["https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=800&auto=format&fit=crop"],
    coverImage: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=800&auto=format&fit=crop",
    originalPrice: 65000,
    sellingPrice: 55000,
    isNewArrival: true,
    isPublished: true
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('3 Products added successfully with new images!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();