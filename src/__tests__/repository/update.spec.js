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

  it("should be able to update repository", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send(repo);

    const response = await request(app)
      .put(`/repositories/${repository.body._id}`)
      .send({
        url: "https://github.com/Rocketseat/unform",
        title: "Unform",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
      });

    expect(response.body).toMatchObject({
      url: "https://github.com/Rocketseat/unform",
      title: "UNFORM",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    });
  });

  it("should not be able to update a repository that does not exist", async () => {
    await request(app).put(`/repositories/123`).expect(400);
  });

  it("should not be able to update repository likes manually", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send(repo);

    const response = await request(app)
      .put(`/repositories/${repository.body._id}`)
      .send({
        likes: 15
      });

    expect(response.body.error).toBe('Error trying to update the amount of likes');
  });

});
