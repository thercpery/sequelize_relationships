const db = require("../models");
const Comment = db.comments;

/* 
    Create a comment
    Business Logic:
    1. Get the comment data from request body.
    2. Check if one or more fields are empty.
    3. If there is no empty field, save the comment into the database.
    4. If there is an empty field, return false.
*/
exports.createComment = (req, res) => {
    let commentData = {
        name: req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId
    };

    console.log(commentData.tutorialId);
    // If none of the fields are empty
    if(commentData.name !== undefined && commentData.text !== undefined && commentData.tutorialId !== undefined){
        // Save the data
        Comment.create(commentData)
            .then(comment => {
                return res.status(200).send(true);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send(false);
            });
    }
    else{
        return res.status(400).send(false);
    }
};

/* 
    Find comment by ID
    Business Logic
    1. Get the comment ID by URL parameter.
    2. Find the data using comment ID.
    3. If not found, return false.
    4. If found, display the comment including the corresponding tutorial.
*/
exports.findCommentById = (req, res) => {
    Comment.findByPk(req.params.id, { 
        include: {
            association: "tutorial"
        } 
    })
        .then(comment => {
            if(comment === null){
                // If comment is not found.
                return res.status(404).send(false);
            }
            else{
                return res.status(200).json(comment);
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });
};

/* 
    Get all comments
    Business Logic:
    1. Find all the comments data using the findAll() method.
    2. Include all the tutorials.
    3. Display all the data.
    4. If error, return error and set status code to 500.
*/

exports.getAllComments = (req, res) => {
    Comment.findAll({
        include: {
            association: "tutorial"
        }
    })
        .then(comments => res.status(200).json(comments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
};