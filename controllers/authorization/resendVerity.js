const User = require("../../models/users");
const { HttpError, sendEmail } = require("../../helpers");
const { SERVER_URL } = process.env;

const resendVerity = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(400, "missing required field email");
    }

    if (!user.verificationToken) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyMail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${SERVER_URL}/api/users/verity/${user.verificationToken}" >Click to verify</a>`,
    };

    await sendEmail(verifyMail);

    res.json({ message: "Verification email sent" });
};

module.exports = resendVerity;