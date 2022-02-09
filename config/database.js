const { Sequelize } = require("sequelize");

module.exports = new Sequelize("sampledb", "root", "1234", {
    host: "localhost",
    dialect: "mysql"
});