module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING
    }, {
        timestamps: false
    });

    return Role;
}