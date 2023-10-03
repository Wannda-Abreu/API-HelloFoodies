import express from "express";
import cors from 'cors';
import db from "./database/db.js"
import recipeRoutes from './routes/receipeRoutes.js' 
import ingredientRoutes from "./routes/ingredientRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import {
  GetRecipesByCategory,
  GetRecipesByIngredient,
} from "./controllers/filterController.js";

export const app = express();

app.get('/', (_req, res) =>{
  res.send('Hola API HelloFoodies');
});

app.use(cors());
app.use(express.json());
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);  
app.use('/categories', categoryRoutes); 
app.get('/recipes/by-category/:category_id', GetRecipesByCategory); 
app.get('/recipes/by-ingredient/:ingredient_id', GetRecipesByIngredient);

try {
  await db.authenticate();
  console.log('Conected to database');
} catch (error) {
  console.log(`Error: ${error}`);
}

export const server = app.listen(8000, () => {
  console.log('🚀 Server up in http://localhost:8000/');
});
