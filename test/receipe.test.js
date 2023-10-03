import request from "supertest";
import { app, server } from "../app.js";
import db from "../database/db.js";

  describe("Test CRUD Recipes", () => {
  beforeAll(async () => {
    await db.sync(); 
  });

  afterAll(async () => {
    await db.close(); 
    server.close(); 
  });

  describe("GET /recipes", () => {
    let response;

    beforeAll(async () => {
      response = await request(app).get("/recipes").send();
    });

    test("should return a response with status 200 and type json", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    test("should return an array of recipes", () => {
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /recipes", () => {
    const validRecipe = {
      title: "Delicious Pasta",
      description: "A mouthwatering pasta recipe",
      category_id: 1,
    };

    const invalidRecipe = {
      description: "A mouthwatering pasta recipe",
    };

    test("should create a new recipe and return status 200", async () => {
      const postResponse = await request(app).post("/recipes").send(validRecipe);
      expect(postResponse.status).toBe(200);
      expect(postResponse.headers["content-type"]).toContain("json");
      expect(postResponse.body.message).toContain("The recipe has been created successfully!");
    });

    test("should return an error if posting an invalid recipe", async () => {
      const postResponse = await request(app).post("/recipes").send(invalidRecipe);
      expect(postResponse.status).toBe(500);
      expect(postResponse.body.message).toContain("Invalid recipe data");
    });
  });

  describe("DELETE /recipes/:id", () => {
    let createdRecipeId;

    beforeAll(async () => {
      const newRecipe = {
        title: "Napole pizza",
        description: "pizza",
        category_id: 1,
      };

      const response = await request(app).post("/recipes/").send(newRecipe);
      createdRecipeId = response.body.id;
    });

    afterAll(async () => {
      await request(app).delete(`/recipes/${createdRecipeId}`);
    });

    test("should delete a recipe and return status 200", async () => {
      const response = await request(app).delete(`/recipes/${32}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Recipe deleted successfully");
    });

    test("should return an error if trying to delete a non-existent recipe", async () => {
      const nonExistentRecipeId = 99999; 
      const response = await request(app).delete(`/recipes/${nonExistentRecipeId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Recipe not found");
    });
  });
});


