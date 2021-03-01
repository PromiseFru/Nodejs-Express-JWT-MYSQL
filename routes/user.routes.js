const {
    authjwt
} = require("../middleware");
const controller = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user",
        [authjwt.verifyToken],
        controller.userBoard
    );

    app.get("/api/test/mod",
        [authjwt.verifyToken, authjwt.isModerator],
        controller.moderatorBoard
    );

    app.get("/api/test/admin",
        [authjwt.verifyToken, authjwt.isAdin],
        controller.adminBoard
    );
}