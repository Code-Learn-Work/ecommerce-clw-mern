import express from 'express'
const router = express.Router()
import {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    listCategories
} from '../controllers/categoryController.js'
import {
    protect,
    admin
} from '../middleware/authMiddleware.js'

router.route('/').get(listCategories).post(protect, admin, createCategory)
router
  .route('/:id')
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory)

export default router