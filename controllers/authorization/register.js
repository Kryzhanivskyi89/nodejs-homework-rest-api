const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const User = require("../../models/users");

const { HttpError, sendEmail } = require("../../helpers");

const { nanoid } = require("nanoid");

// const { SERVER_URL } = process.env;

const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        
        if (!email) {
            throw HttpError(400, "Missing required email field");
        }

        const user = await User.findOne({ email });

        if (user) {
            throw HttpError(409, "Email already in use");
        }

        const avatarURL = gravatar.url(email);
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = nanoid();

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            avatarURL,
            verificationToken,
        });

        // const verifyMail = {
        //     to: email,
        //     subject: "Verify email",
        //     html: `<a target="_blank" href="${SERVER_URL}/api/users/verity/${user.verificationToken}" >Click to verify</a>`,
        // };

        // await sendEmail(verifyMail);

        res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            subscription: newUser.subscription,
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports =  register ;
    