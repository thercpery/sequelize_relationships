const db = require("../models");
const Tag = db.tags;
const Tutorial = db.tutorials;

/* 
    Create a tag
    Business Logic:
    1. Get the tag data from request body.
    2. Check if the field is empty.
    3. If not empty, save the data.
    4. If empty, return false and send status 500.
*/
exports.createTag = (req, res) => {
    const tagData = {
        name: req.body.name
    };

    Tag.create(tagData)
        .then(tag => res.status(201).send(true))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

/* 
    View all tags
    Business Logic:
    1. Find all tags in the database including tutorials.
    2. Display the data
*/
exports.findAllTags = (req, res) => {
    Tag.findAll({
        include: [
            {
                model: Tutorial,
                as: "tutorials",
                attributes: ["id", "title", "description"],
                through: {
                    attributes: []
                }
            }
        ]
    })
        .then(tags => res.status(200).json(tags))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

/* 
    View one tag
    Business Logic:
    1. Get the tag ID by URL parameter.
    2. Find the data using tag ID.
    3. If found, display the data including the tutorials associated with it.
    4. If not found, return false. 
*/
exports.findTagById = (req, res) => {
    const id = req.params.id;
    Tag.findByPk(id, {
        include: [
            {
                model: Tutorial,
                as: "tutorials",
                attirbutes: ["id", "title", "description"],
                through: {
                    attributes: []
                }
            }
        ]
    })
        .then(tag => {
            if(tag){
                res.status(200).json(tag)
            }
            else{
                res.status(400).send(false);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

/* 
    Add a tutorial to a tag
    Business Logic:
    1. Get the tag ID through the URL parameter.
    2. Get the tutorial ID through request body.
    3. Find the tag data with the tag ID.
    4. If tag data is found, find the tutorial data with the tutorial ID.
    5. If tutorial data is found, update the tutorial and tag data.
    6. If tutorial data is not found, return false.
    7. If tag data is not found, return false.
*/
exports.addTutorial = (req, res) => {
    const tagId = req.params.id;
    const tutorialId = req.body.tutorialId;
    Tag.findByPk(tagId)
        .then(tag => {
            console.log(tag);
            if(!tag){
                res.status(400).send(false);
            }
            else{
                Tutorial.findByPk(tutorialId)
                    .then(tutorial => {
                        
                        if(!tutorial){
                            res.status(400).send(false);
                        }
                        else{
                            tag.addTutorial(tutorial);
                            res.status(201).send(true);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};