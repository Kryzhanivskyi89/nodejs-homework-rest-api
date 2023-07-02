const { ctrlWrapper } = require("../../decorators");

const register = require("./register");

const login = require("./login");

const getCurrent = require("./getCurrent");

const logout = require("./logout");

const userUpdateSubscription = require("./userUpdateSubscription");

const updateAvatarUrl = require("./updateAvatarUrl");

const resendVerity = require("./resendVerity");

const getVerity = require("./getVerity");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    userUpdateSubscription: ctrlWrapper(userUpdateSubscription),
    updateAvatarUrl: ctrlWrapper(updateAvatarUrl),
     resendVerity: ctrlWrapper(resendVerity),
    getVerity: ctrlWrapper(getVerity),
};