import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

dotenv.config();

const forceAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // 1. Delete ALL existing admins to clear any bad data
    await Admin.deleteMany({});
    console.log('🗑️  All old admins deleted.');

    // 2. Create the exact admin you want
    const newAdmin = await Admin.create({
      email: 'admin@ghunghatsultana.com',
      password: 'GhunghatAdmin@2026', 
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@ghunghatsultana.com');
    console.log('Password: GhunghatAdmin@2026');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

forceAdmin();