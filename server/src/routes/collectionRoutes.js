import express from 'express';
import { getCollections, createCollection, deleteCollection } from '../controllers/collectionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getCollections).post(protect, createCollection);
router.route('/:id').delete(protect, deleteCollection);
export default router;