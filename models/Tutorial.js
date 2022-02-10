module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Tutorial;
};