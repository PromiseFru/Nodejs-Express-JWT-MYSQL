require('dotenv').config();

const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    };

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        };

        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    roles.forEaach((ele, i) => {
        if (ele.name === "admin") {
            next();
            return;
        }
    })

    return res.status(403).send({
        message: "Require Admin Role!"
    })
};

isModerator = async (req, res, next) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    roles.forEaach((ele, i) => {
        if (ele.name === "moderator") {
            next();
            return;
        }
    })

    return res.status(403).send({
        message: "Require Moderator Role!"
    })
};

isModeratorOrAdmin = async (req, res, next) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    roles.forEaach((ele, i) => {
        if (ele.name === "admin") {
            next();
            return;
        }

        if (ele.name === "moderator") {
            next();
            return;
        }
    })

    return res.status(403).send({
        message: "Require Moderator Or Admin Role!"
    });
};

module.exports = authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}