import Enquiry from '../models/Enquiry.js';

// @desc    Log a WhatsApp enquiry click
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { productId, productName } = req.body;
    
    if (!productId || !productName) {
      return res.status(400).json({ success: false, message: 'Missing product details' });
    }

    const enquiry = await Enquiry.create({ productId, productName });
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all enquiries (for Admin Dashboard)
// @route   GET /api/enquiries
// @access  Private (Admin only)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};