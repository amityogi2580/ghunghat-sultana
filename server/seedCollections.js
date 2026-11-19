import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Collection from './src/models/Collection.js';

dotenv.config();

const collections = [
  {
    name: "Bridal",
    description: "Heirloom pieces for your special day"
  },
  {
    name: "Festive",
    description: "Celebrate in modern silhouettes"
  },
  {
    name: "Everyday",
    description: "Refined comfort for daily wear"
  }
];

const seedCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing collections to avoid duplicates during testing
    await Collection.deleteMany();
    console.log('Existing collections cleared.');

    // Insert new collections
    await Collection.insertMany(collections);
    console.log('3 Collections added successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedCollections();