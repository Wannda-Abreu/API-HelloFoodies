import IngredientModel from "../models/ingredientModel.js";

function extractIngredientData(body) {
  const { title } = body;
  return { title };
}

function validateIngredientData(ingredientData) {
  const { title } = ingredientData;
  return title && typeof title === "string" && title.trim() !== "";
}

// GET
export const GetAllIngredient = async (_req, res) => {
  try {
    const ingredients = await IngredientModel.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const CreateIngredient = async (req, res) => {
  try {
    const ingredientData = extractIngredientData(req.body);

    if (validateIngredientData(ingredientData)) {
      await IngredientModel.create(ingredientData);
      res.json({ message: "The ingredient has been created successfully!" });
    } else {
      res.status(400).json({ message: "Invalid ingredient data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const DeleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await IngredientModel.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    await ingredient.destroy();

    return res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const UpdateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Invalid ingredient data" });
    }

    const ingredient = await IngredientModel.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    ingredient.title = title;
    await ingredient.save();

    return res.status(200).json({ message: "Ingredient updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
