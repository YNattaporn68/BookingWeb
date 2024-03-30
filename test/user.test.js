const request = require('supertest');
const app = require('../index');

describe("User Registration", () => {
    test("Should register a new user", async () => {
        const response = await request(app)
            .post("/auth/SignupPage")
            .send({
                name: "Test User",
                username: "testuser",
                password: "testpassword",
                passwordConfirm: "testpassword"
            });

        expect(response.status).toBe(200);
    });
});