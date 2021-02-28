require('dotenv').config();
const db = require('../models');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

try {
    module.exports = signip = async (req, res) => {
        // Save User to Databse
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        // check if user set roles
        if (req.body.roles) {
            let roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });

            await user.setRoles(roles).catch(e => {
                res.status(500).send({
                    message: e.message
                })
            })
            return res.send({
                message: "User was registered succesfully"
            });
        };

        // if no user role set role to id = 1
        await user.setRoles([1]).catch(e => {
            res.status(500).send({
                message: e.message
            });
        })
        return res.send({
            message: "User was registered successfully"
        });
    };

    module.exports = signIn = async (req, res) => {
        // look for user
        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        // user not found
        if (!user) {
            return res.status(404).send({
                message: "User Not Found."
            })
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status.send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        let token = jwt.sign({
            id: user.id
        }, process.env.SECRET, {
            expiresIn: 86400
        });

        let authorities = [];
        let roles = await user.getRoles().catch(e => {
            res.status(500).send({
                message: e.message
            });
        });
        roles.forEach((ele, i) => {
            authorities.push('ROLE_' + ele.name.toUpperCase());
        })

        return res.status(200).send({
            id: user.is,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    }
} catch (e) {
    console.log(e);
}