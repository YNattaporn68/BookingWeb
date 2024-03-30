const request = require('supertest');
const app = require('../index'); // Import your Express app

describe("User Login", () => {
    test("Should login an existing user", async () => {
        const response = await request(app)
            .post("/auth/LoginPage")
            .send({
                username: "existinguser",
                password: "password"
            });
        
        expect(response.statusCode).toBe(302); // Expecting a redirect
        expect(response.headers.location).toBe("/HomePage.hbs");
    });

    test("Should not login with incorrect credentials", async () => {
        const response = await request(app)
            .post("/auth/LoginPage")
            .send({
                username: "nonexistinguser",
                password: "wrongpassword"
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.text).toContain("Username or password is incorrect");
    });
});