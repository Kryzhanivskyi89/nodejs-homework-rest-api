const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../models/users");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Знаходимо користувача за email
        const user = await User.findOne({ email });

        // Якщо користувач не знайдений, викидаємо помилку авторизації
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        // Порівнюємо введений пароль з хешем з бази даних
        const passwordCompare = await bcrypt.compare(password, user.password);

        // Якщо паролі не співпадають, викидаємо помилку авторизації
        if (!passwordCompare) {
            throw HttpError(401, "Email or password is wrong");
        }

        // Отримуємо id користувача для створення токену
        const { _id: id } = user;

        // Створюємо JWT токен з id користувача
        const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "23h" });

        // Оновлюємо токен в базі даних для користувача
        await User.findByIdAndUpdate(id, { token });

        // Відправляємо успішну відповідь з токеном і інформацією про користувача
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        // Обробка помилок
        res.status(error.status || 500).json({ message: error.message || "Server error" });
    }
};

module.exports = login;

// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");

// const User = require("../../models/users");

// const { HttpError } = require("../../helpers");

// const { SECRET_KEY } = process.env;

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//         throw HttpError(401, "Email or password is wrong");
//     }
//     const passwordCompare = await bcrypt.compare(password, user.password);

//     if (!passwordCompare) {
//         throw HttpError(401, "Email or password is wrongs");
//     }

//     const { _id: id } = user;

//     const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "23h" });
//     await User.findByIdAndUpdate(id, { token });

//     res.json({
//         token,
//         user: {
//             email: user.email,
//             subscription: user.subscription,
//         },
//     });
// };

// module.exports = login;