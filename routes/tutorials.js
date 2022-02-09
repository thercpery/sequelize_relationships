const express = require("express");
const Tutorial = require("../models/Tutorial");
const tutorialController = require("../controllers/tutorials");
const router = express.Router();

// View all tutorials
router.get("/", tutorialController.viewAllTutorials);

// Create a tutorial
router.post("/", tutorialController.createTutorial);

// Get specific tutorial
router.get("/:id", tutorialController.findTutorialById);

module.exports = router;