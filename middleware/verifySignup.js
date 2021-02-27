const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameAndEmail = async (req, res, next) => {
    // Username
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (user) {
        return res.status(400).send({
            message: "Username is already in use!"
        });
    }

    // Email
    let email = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (email) {
        return res.status(400).send({
            message: "Email already in use!"
        });
    };

    next();
};

checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        req.body.roles.forEach((element, i) => {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: ` Role does not exist ${req.body.roles[i]}`
                })
            }
        });
    }

    next();
}

module.exports = verifySignup = {
    checkDuplicateUsernameAndEmail: checkDuplicateUsernameAndEmail,
    checkRolesExisted: checkRolesExisted
}