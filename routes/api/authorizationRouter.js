const express = require("express");

const router = express.Router();

const authorizationController = require("../../controllers/authorization");

const { authenticate } = require("../../middlewares");

const schemas = require("../../schemas/auth");

const { validateBody } = require("../../decorators");

router.post(
    "/register",
    validateBody(schemas.userAuthSchema),
    authorizationController.register
);

router.post(
    "/login",
    validateBody(schemas.userAuthSchema),
    authorizationController.login
);
router.get("/current", authenticate, authorizationController.getCurrent);

router.post("/logout", authenticate, authorizationController.logout);

router.patch(
    "/",
    authenticate,
    validateBody(schemas.userUpdateSubscription),
    authorizationController.userUpdateSubscription
);

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatarURL"),
    authorizationController.updateAvatarUrl
);

module.exports = router;