const express = require("express");
const Comment = require("../models/Comment");
const commentController = require("../controllers/comments");
const router = express.Router();

// Create a comment
router.post("/", commentController.createComment);

// Find comment by id
router.get("/:id", commentController.findCommentById);

module.exports = router;