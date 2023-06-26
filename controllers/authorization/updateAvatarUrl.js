
const fs = require("fs/promises");

const path = require("path");

const Jimp = require("jimp");

const User = require("../../models/users");

const { HttpError } = require("../../helpers");

const avatarsDir = path.resolve("public", "avatars");

const publicDir = path.resolve("public");

const updateAvatarUrl = async (req, res) => {
    const { _id: id } = req.user;
    const { path: oldPath, filename } = req.file;

    const { avatarURL: oldAvatar } = await User.findById(id);

    if (oldAvatar.includes("avatars")) {
        const oldAvatarFile = path.join(publicDir, oldAvatar);

        try {
            await fs.access(oldAvatarFile);
            await fs.unlink(oldAvatarFile);
        } catch (error) {
            console.log("File not found");
        }
    }

    const newPath = path.join(avatarsDir, filename);
    const avatarURL = path.join("avatars", filename);

    Jimp.read(oldPath, (err, img) => {
        if (err) throw err;
        img.resize(250, 250).write(newPath);
    });

    await fs.unlink(oldPath);

    const result = await User.findByIdAndUpdate(
        id,
        { avatarURL },
        {
            new: true,
        }
    );

    if (!result) {
        throw HttpError(404);
    }

    res.status(200).json(result);
};

module.exports = updateAvatarUrl;