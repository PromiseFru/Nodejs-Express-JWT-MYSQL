require('dotenv').config();
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const db = {};

initialize();

async function initialize() {
    let dbConfig = {
        HOST: process.env.HOST,
        USER: process.env.OWNER,
        PASSWORD: process.env.PASSWORD,
        DB: process.env.DATABASE,
        dialect: "mysql"
    };

    // create db if it doesn't already exist
    const connection = await mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);

    console.log(dbConfig.DB + " DATABASE IS READY");

    // connect to db
    const sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USER,
        dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect
        }
    );

    // init models and add them to the exported db object
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.user = require('../models/user.model.js')(sequelize, Sequelize);
    db.role = require('../models/role.model.js')(sequelize, Sequelize);

    db.role.belongsToMany(db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
    });

    db.user.belongsToMany(db.role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
    });

    db.ROLES = ["user", "admin", "moderator"];

    // sync all models with database
    db.sync = await sequelize.sync();
};

module.exports = db;