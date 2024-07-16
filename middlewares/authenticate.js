
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    // Отримуємо заголовок Authorization або ініціалізуємо порожній рядок, якщо він не вказаний
    const { authorization = "" } = req.headers;
    // Розділяємо заголовок на частини за пробілом
    const [bearer, token] = authorization.split(" ");

    // Перевіряємо, чи перший елемент є рівним "Bearer" і чи присутній другий елемент (токен)
    if (bearer !== "Bearer" || !token) {
        return next(HttpError(401, "Unauthorized"));
    }

    try {
        // Розшифровуємо токен і отримуємо ідентифікатор користувача
        const { id } = jwt.verify(token, SECRET_KEY);
        
        // Знаходимо користувача за ідентифікатором
        const user = await User.findById(id);

        // Перевіряємо, чи знайдений користувач і чи він має активний токен
        if (!user || !user.token) {
            return next(HttpError(401, "Unauthorized"));
        }

        // Якщо все гаразд, зберігаємо об'єкт користувача у властивості `req.user` і продовжуємо виконання
        req.user = user;
        next();
    } catch (error) {
        // В разі помилки під час розшифровки токену або пошуку користувача
        return next(HttpError(401, "Unauthorized"));
    }
};

module.exports = authenticate;

// const jwt = require("jsonwebtoken");

// const { HttpError } = require("../helpers");
// const User = require("../models/users");

// const { SECRET_KEY } = process.env;

// const authenticate = async (req, res, next) => {
//     const { authorization = "" } = req.headers;
//     const [bearer, token] = authorization.split(" ");

//     if (bearer !== "Bearer") {
//         next(HttpError(401));
//     } else {
//         try {
//             const { id } = jwt.verify(token, SECRET_KEY);
//             const user = await User.findById(id);
//             if (!user || !user.token) {
//                 next(HttpError(401));
//             }
//             req.user = user;
//             next();
//         } catch (error) {
//             next(HttpError(401));
//         }
//     }
// };

// module.exports = authenticate;