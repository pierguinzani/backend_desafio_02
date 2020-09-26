const request = require("supertest");
const app = require("../../src");

describe("Testing home route", () => {
  it("should response home route with status 200", async () => {
    const response = await request(app).get("/");
    const { statusCode } = response;

    expect(statusCode).toBe(200);
  });
});
