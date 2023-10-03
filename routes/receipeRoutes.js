import express from "express";
import {
  GetAllRecipes,
  CreateRecipe,
  DeleteRecipe,
  UpdateRecipe
} from "../controllers/recipeController.js"; 

const recipeRouter = express.Router();

recipeRouter.get("/", GetAllRecipes);

recipeRouter.post("/", CreateRecipe);

recipeRouter.delete("/:id", DeleteRecipe);

recipeRouter.put("/:id", UpdateRecipe);

export default recipeRouter;
