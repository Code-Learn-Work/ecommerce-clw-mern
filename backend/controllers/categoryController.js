import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'

// Get Category By ID
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
  
    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  })

// Create new Category
const createCategory = asyncHandler(async (req, res) => {
    const category = new Category({
        name: 'Sample Name',
        description: 'Sample Description',
        products: []
    })

    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
})

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
    const {
        name,
        description,
    } = req.body

    const category = await Category.findById(req.params.id)

    if (category) {
        category.name = name
        category.description = description

        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

// Delete the Category
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (category) {
        await category.remove()
        res.json({
            message: 'Category removed'
        })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
});

// List Categories
const listCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
});

export {
    listCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
    createCategory
}