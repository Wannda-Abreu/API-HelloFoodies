import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import IngredientModel from '../models/ingredientModel.js'; 

const RecipeModel = db.define('recipes', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 1 },
  },
}, {
  timestamps: false,
});

RecipeModel.belongsToMany(IngredientModel, {
  through: 'recipe_ingredients', 
  foreignKey: 'recipe_id', 
  otherKey: 'ingredient_id', 
});

export default RecipeModel;

