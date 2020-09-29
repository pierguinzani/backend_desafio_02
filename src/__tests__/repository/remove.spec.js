const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
const { HOSTMONGO, MONGOBD } = require("../../../config");

const repo = {
  url: "https://github.com/Rocketseat/umbriel",
  title: "Umbriel",
  techs: ["Node", "Express", "TypeScript"]
};
describe("Repositories", () => {
  beforeEach(async () => {
    await useDatabase(HOSTMONGO, MONGOBD);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    await disconnectDatabase();
  });

  it("should be able to delete the repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    await request(app).delete(`/repositories/${response.body._id}`).expect(204);

    const repositories = await request(app).get("/repositories");

    const repository = repositories.body.find((r) => r._id === response.body._id);

    expect(repository).toBe(undefined);
  });

  it("should not be able to delete a repository that does not exist", async () => {
    await request(app).delete(`/repositories/123`).expect(400);
  });

});
