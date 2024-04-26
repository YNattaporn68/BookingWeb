//pass
const mysql = require("mysql");

describe("Database Connection", () => {
    test("Should connect to MySQL database", () => {
        const db = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE
        });

        db.connect((error) => {
            expect(error).toBeNull();
            db.end(); // Close the connection after the test
        });
    });
});
// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total

