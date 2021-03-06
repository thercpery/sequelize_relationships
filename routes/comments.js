const express = require("express");
const commentController = require("../controllers/comments");
const router = express.Router();

// Create a comment
router.post("/", commentController.createComment);

// Find comment by id
router.get("/:id", commentController.findCommentById);

// Get all comments
router.get("/", commentController.getAllComments);

module.exports = router;