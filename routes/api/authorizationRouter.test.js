const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { DB_HOST, PORT, SECRET_KEY } = process.env;

const app = require("../../app");

let server = null;

const idUser = "359c8af1c5216f62ad0f03sd";
const user = {
    email: "vjaoqwesr506@ukr.com",
    password: "556633",
};

describe("test login route", () => {
    beforeAll(async () => {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST);
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    test("test login correct data", async () => {
        const { statusCode, body } = await request(app)
            .post("/api/users/login")
            .send(user);

        const { id } = jwt.verify(body.token, SECRET_KEY);
        const { email, subscription } = body.user;
        expect(statusCode).toBe(200);
        expect(body.token).toBeDefined();
        expect(id).toBe(idUser);
        expect(email).toBe(user.email);
        expect(typeof subscription).toBe("string");
    });
});