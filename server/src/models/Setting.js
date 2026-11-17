import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    whatsappNumber: { type: String, default: '+919999999999' },
    instagramUrl: { type: String, default: 'https://instagram.com/ghunghatsultana' },
    contactEmail: { type: String, default: 'hello@ghunghatsultana.com' },
    announcementText: { type: String, default: 'Complimentary Shipping on Orders Above ₹5000 | Worldwide Delivery' },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;