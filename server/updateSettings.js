import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from './src/models/Setting.js';

dotenv.config();

const updateSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Find the settings document and update the numbers/links
    await Setting.findOneAndUpdate(
      {}, 
      { 
        whatsappNumber: '+919782675316',
        instagramUrl: 'https://www.instagram.com/ghunghat_sultana_',
        contactEmail: 'hello@ghunghatfashion.com'
      },
      { upsert: true, new: true }
    );

    console.log('✅ Settings updated successfully!');
    console.log('WhatsApp Number is now: +919782675316');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

updateSettings();