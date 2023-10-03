import CategoryModel from "../models/categoryModel.js";

// GET
export const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Category title is required" });
    }

    const category = await CategoryModel.create({ title });
    res.json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Category title is required" });
    }

    const category = await CategoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.title = title;
    await category.save();

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

