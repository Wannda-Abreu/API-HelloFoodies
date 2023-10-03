import express from "express";
import {
  GetAllIngredient,
  CreateIngredient,
  DeleteIngredient,
  UpdateIngredient
} from "../controllers/ingredientController.js"; 

const ingredientRouter = express.Router();

ingredientRouter.get("/", GetAllIngredient); 

ingredientRouter.post("/", CreateIngredient);

ingredientRouter.delete("/:id", DeleteIngredient);

ingredientRouter.put("/:id", UpdateIngredient);

export default ingredientRouter;
