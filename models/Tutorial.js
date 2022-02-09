const { Sequelize, DataTypes } = require("sequelize");
const Comment = require("./Comment");
const db = require("../config/database");

const Tutorial = db.define("tutorials", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        default: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        default: new Date()
    }
});

Tutorial.hasMany(Comment, { 
    as: "comments" 
});


module.exports = Tutorial;