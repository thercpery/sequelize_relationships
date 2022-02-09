const { Sequelize, DataTypes } = require("sequelize");
const Tutorial = require("./Tutorial");
const db = require("../config/database");

const Comment = db.define("comments", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        default: new Date()    
    },
    updatedAt: {
        type: DataTypes.DATE,
        default: new Date()
    },
    tutorialId: {
        type: DataTypes.INTEGER(11),
        references: {
            model: "Tutorial",
            key: "id"
        }
    }
});

Comment.associations = (Tutorial) => {
    Comment.belongsTo(Tutorial, {
        foreignKey: "tutorialId",
        as: "tutorial"
    });
};


module.exports = Comment;