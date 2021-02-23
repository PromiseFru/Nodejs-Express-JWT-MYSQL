module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTERGER,
            primaryKey: true
        },
        name: Sequelize.STRING
    });

    return Role;
}