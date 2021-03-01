const {
    verifySignup
} = require('../middleware');
const controllers = require("../controllers/auth.controller.js");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept;"
        );
        next();
    });

    app.post("/api/auth/signup",
        [verifySignup.checkDuplicateUsernameAndEmail, verifySignup.checkRolesExisted],
        controllers.signup
    );

    app.post("/api/auth/signin", controllers.signin);
};