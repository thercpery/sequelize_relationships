const db = require("../models");
const Tutorial = db.tutorials;
/* 
    View all Tutorials
    Business Logic:
    1. Find all the tutorials data using the findAll() method.
    2. Include all the comments.
    3. Display all the data.
    4. If error, return error and set status code to 500.
*/
exports.viewAllTutorials = (req, res) => {
    Tutorial.findAll({
        include: ["comments", "tags"]
    })
        .then(tutorials => res.status(200).json(tutorials))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}

/* 
    Create a tutorial
    Business Logic:
    1. Get the data from the request body.
    2. Check if the fields are not empty.
    3. If the fields are not empty, save the data from the request body into the database.
    4. Return true if it is successfully saved.
    5. If one or more fields are empty, return false.
    6. If error happens, return false.
*/
exports.createTutorial = (req, res) => {
    const tutorialData = {
        title: req.body.title,
        description: req.body.description
    };

    if(tutorialData.title !== undefined && tutorialData.description !== undefined){
        Tutorial.create(tutorialData)
        .then(tutorial => {
            return res.status(201).send(true);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err)
            });
    }
    else{
        return res.status(404).send(false);
    }
};

/* 
    Find One Tutorial
    Business Logic:
    1. Get the tutorial ID from the URL parameter.
    2. Find the data by the tutorial ID from URL.
    3. If not found, return false and set status code to 404.
    4. If found, display the data including comments.
*/
exports.findTutorialById = (req, res) => {
    Tutorial.findByPk(req.params.id, {
        include: ["comments"]
    })
        .then(tutorial => {
            if(tutorial === null){
                // If ID is not found or no data found.
                return res.status(404).send(false);
            }
            else{
                return res.status(200).json(tutorial)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

