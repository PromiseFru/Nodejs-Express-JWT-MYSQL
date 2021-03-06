module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        timestamps: false
    });

    return User;
}