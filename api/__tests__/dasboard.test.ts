import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

describe("get /ticker", () => {
    let token: string = "";
    beforeAll(async () => {
        const res = await request
            .post("/api/login")
            .set("Content-Type", "application/json")
            .send({
                "email": "admin@test.com",
                "password": "AlQcExwqyvMExVJ"
            });
        token = res.body.access_token;
    });
    test("return list of ticker", async () => {
        const res = await request
            .get("/api/ticker")
            .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    });
    test("Wrong request method return empty", async () => {
        const res = await request
            .post("/api/ticker")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({})
    });
    test("Request without Authorization return 401 Unauthorized", async () => {
        const res = await request
            .get("/api/ticker")
        expect(res.statusCode).toEqual(401);
    });
});
