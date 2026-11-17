import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

// Load env vars
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await Admin.findOne({ email: 'admin@ghunghatsultana.com' });
    
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    await Admin.create({
      email: 'admin@ghunghatsultana.com',
      password: 'password123',
    });

    console.log('Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();