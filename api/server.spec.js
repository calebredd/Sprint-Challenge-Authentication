const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  test("should set the server environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /api", () => {
    it("should return status 200 OK", async () => {
      const res = await request(server).get("/api");
      expect(res.status).toBe(200);
    });

    it("should return a json object", async () => {
      const res = await request(server).get("/api");
      expect(res.type).toBe("application/json");
    });
    it('should return {message:"Welcome to the API"}', async () => {
      const res = await request(server).get("/api");
      expect(res.body).toEqual({ message: "Welcome to the API" });
    });
  });
});
