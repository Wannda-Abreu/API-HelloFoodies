import { Op } from "sequelize";
import RecipeModel from "../models/recipeModel.js";
import IngredientModel from "../models/ingredientModel.js";

export const GetRecipesByCategory = async (req, res) => {
  const { category_id } = req.params;
  
  try {
    const recipes = await RecipeModel.findAll({
      where: { category_id },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetRecipesByIngredient = async (req, res) => {
  const { ingredient_id } = req.params;
  
  try {
    const recipes = await RecipeModel.findAll({
      include: [{
        model: IngredientModel, 
        through: 'recipe_ingredients',
        where: { id: ingredient_id }, 
      }],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
