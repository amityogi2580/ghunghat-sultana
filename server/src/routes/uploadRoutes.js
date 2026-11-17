import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer to store files in memory temporarily (not on the disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /api/upload (Protected by JWT)
router.post('/', protect, upload.single('image'), uploadImage);

export default router;