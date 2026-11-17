import express from 'express';
import { 
  getCategories, 
  createCategory, 
  deleteCategory 
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.route('/').get(getCategories);

// Admin routes (Protected)
router.route('/').post(protect, createCategory);
router.route('/:id').delete(protect, deleteCategory);

export default router;