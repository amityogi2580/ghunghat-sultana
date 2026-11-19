import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    whatsappNumber: { type: String, default: '+919782675316' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/ghunghat_sultana_' },
    contactEmail: { type: String, default: 'hello@ghunghatfashion.com' },
    announcementText: { type: String, default: 'Complimentary Shipping on Orders Above ₹5000 | Worldwide Delivery' },
    
    heroTitle: { type: String, default: 'Timeless Elegance' },
    heroSubtitle: { type: String, default: 'Discover a curation of premium Indian fashion and heritage designs. Crafted for the modern muse who values artistry and tradition.' },
    heroImage: { type: String, default: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop' },
    heroFloatImage: { type: String, default: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop' },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;