module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tags", {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    });

    return Tag;
};