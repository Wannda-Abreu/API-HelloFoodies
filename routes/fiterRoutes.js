import express from "express";
import {
  GetRecipesByCategory,
  GetRecipesByIngredient,
} from "../controllers/filterController.js";

const filterRouter = express.Router();

filterRouter.get("/by-category/:category_id", GetRecipesByCategory);
filterRouter.get("/by-ingredient/:ingredient_id", GetRecipesByIngredient);

export default filterRouter;
