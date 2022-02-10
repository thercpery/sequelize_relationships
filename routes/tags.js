const express = require("express");
const tagController = require("../controllers/tags");
const router = express.Router();

// Create a tag
router.post("/", tagController.createTag);

// Find all tags
router.get("/", tagController.findAllTags);

// Find one tag by ID
router.get("/:id", tagController.findTagById);

// Add a tutorial to a tag
router.post("/:id", tagController.addTutorial);

module.exports = router;