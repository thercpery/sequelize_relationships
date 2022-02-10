const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./Tutorial")(sequelize, Sequelize);
db.comments = require("./Comment")(sequelize, Sequelize);
db.tags = require("./Tag")(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, { as: "comments" });

db.comments.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "tutorial"
});

db.tutorials.belongsToMany(db.tags, {
    through: "tutorial_tag",
    as: "tags",
    foreignKey: "tutorialId"
});

db.tags.belongsToMany(db.tutorials, {
    through: "tutorial_tag",
    as: "tutorials",
    foreignKey: "tagId"
});


module.exports = db;