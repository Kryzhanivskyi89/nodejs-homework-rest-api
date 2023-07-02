const nodemailer = require("nodemailer");

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
    host: "imap.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    transport.sendMail({ ...data, from: UKR_NET_EMAIL });
    return true;
};

module.exports = sendEmail;