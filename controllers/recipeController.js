import RecipeModel from "../models/recipeModel.js";
import { Op } from "sequelize";

//GET

export const GetAllRecipes = async (_req, res) => {
  try {
    const recipes = await RecipeModel.findAll();
    res.json(recipes);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

//CREATE

export const CreateRecipe = async (req, res) => {
  try {
    const recipeData = extractRecipeData(req.body);

    if (validateRecipeData(recipeData)) {
      await RecipeModel.create(recipeData);
      res.json({ message: "The recipe has been created successfully!" });
    } else {
      res.status(500).json({ message: "Invalid recipe data" });
    }
  } catch (error) {
    handleIngredientResponse(res, error);
  }
};

function extractRecipeData(body) {
  const { title, description, category_id } = body;
  return { title, description, category_id };
}

function validateRecipeData(recipeData) {
  const { title, description, category_id } = recipeData;
  return title && description && typeof category_id === "number" && category_id >= 1;
}

function handleErrorResponse(res, error) {
  res.status(500).json({ message: error.message });
}


// DELETE

export const DeleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeModel.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.destroy();

    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//UPDATE

export const UpdateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category_id } = req.body;
 

    if (!title || !description || !category_id || typeof category_id !== "number" || category_id < 1) {
      return res.status(400).json({ message: "Invalid recipe data" });
    }

    const recipe = await RecipeModel.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.category_id = category_id;
    await recipe.save();

    return res.status(200).json({ message: "Recipe updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
