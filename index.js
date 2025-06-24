const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./model/recipe.model");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

initializeDatabase();

const app = express();
app.use(express.json());
app.use(cors()); // allows requests from any origin

const PORT = process.env.PORT;

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const save = await newRecipe.save();
    if (save) {
      res
        .status(201)
        .json({ message: "New recipe added successfully", newRecipe: save });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    console.error("Add recipe error:", error);
    res.status(500).json({ error: "Failed to add new recipe." });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length != 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    console.error("Fetch recipes error:", error);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

app.get("/recipes/title/:recipeTitle", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.recipeTitle });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    console.error("Fetch recipe by title error:", error);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

app.get("/recipes/author/:recipeAuthor", async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.recipeAuthor });
    if (recipes != 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch (error) {
    console.error("Fetch recipe by author error:", error);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

app.get("/recipes/difficulty/:level", async (req, res) => {
  try {
    const recipes = await Recipe.find({ difficulty: req.params.level });
    if (recipes != 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch (error) {
    console.error("Fetch recipe by difficulty error:", error);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

app.post("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipie = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedRecipie) {
      res
        .status(200)
        .json({ message: "Recipe updated successfully", updatedRecipie });
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch (error) {
    console.error("Update recipe by ID error:", error);
    res.status(500).json({ error: "Failed to update recipe." });
  }
});

app.post("/recipes/title/:recipeTitle", async (req, res) => {
  try {
    const updatedRecipie = await Recipe.findOneAndUpdate(
      { title: req.params.recipeTitle },
      req.body,
      { new: true }
    );
    if (updatedRecipie) {
      res
        .status(200)
        .json({ message: "Recipe updated successfully", updatedRecipie });
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch (error) {
    console.error("Update recipe by Title error:", error);
    res.status(500).json({ error: "Failed to update recipe." });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (deleteRecipe) {
      res
        .status(200)
        .json({ message: "Recipe deleted successfully", deleteRecipe });
    } else {
      res.status(404).json({ error: "Recipes not found." });
    }
  } catch (error) {
    console.error("Delete recipe error:", error);
    res.status(500).json({ error: "Failed to delete recipe." });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
