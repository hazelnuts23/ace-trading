import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

describe("POST /api/login", () => {
    test("return error with invalid email", () => {
        return request
            .post("/api/login").send({
                "email": "admin$test.com"
            }).then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toEqual(expect.objectContaining({
                    message: "Invalid Input"
                }));
            });
    });
    test("return error message missing input (password)", () => {
        return request
            .post("/api/login").send({
                "email": "admin@test.com"
            }).then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toEqual(expect.objectContaining({
                    message: "Invalid Input"
                }));
            })
    });
    test("return error message missing input (email)", () => {
        return request
            .post("/api/login").send({
                "password": "abcd123235"
            }).then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toEqual(expect.objectContaining({
                    message: "Invalid Input"
                }));
            })
    });
    test("return error message missing input (email)", () => {
        return request
            .post("/api/login").send({
                "password": "abcd123235"
            }).then((res) => {
                expect(res.statusCode).toEqual(400);
                expect(res.body).toEqual(expect.objectContaining({
                    message: "Invalid Input"
                }));
            })
    });
    test("Wrong request method return empty", () => {
        return request
            .get("/login").then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual({})
            });
    });
    test("return 401 status for invalid login", () => {
        return request
            .post("/api/login").send({
                "email": "admin2@test.com",
                "password": "abcd3"
            }).then((res) => {
                expect(res.statusCode).toEqual(400);
            })
    });
    test("return success response", () => {
        return request
            .post("/api/login").send({
                "email": "admin@test.com",
                "password": "AlQcExwqyvMExVJ"
            }).then((res) => {
                expect(res.statusCode).toEqual(200);
            })
    });
});

