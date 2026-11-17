import express from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createEnquiry).get(protect, getEnquiries);

export default router;