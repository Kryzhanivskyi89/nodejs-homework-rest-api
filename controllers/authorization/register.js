const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const User = require("../../models/users");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        avatarURL,
        password: hashPassword,
    });
    
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

module.exports = register;