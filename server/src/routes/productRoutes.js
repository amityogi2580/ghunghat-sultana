import express from 'express';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  getAdminProducts, 
  updateProduct,
  deleteProduct 
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// Admin routes (Protected)
router.route('/admin/all').get(protect, getAdminProducts);
router.route('/').post(protect, createProduct);
router.route('/:id').put(protect, updateProduct); // <-- Added Update route
router.route('/:id').delete(protect, deleteProduct);

export default router;