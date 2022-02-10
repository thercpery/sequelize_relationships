module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Comment;
};