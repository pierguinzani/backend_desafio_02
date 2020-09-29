const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
const { HOSTMONGO, MONGOBD } = require("../../../config");

// const repo = {
//   url: "https://github.com/Rocketseat/umbriel",
//   title: "Umbriel",
//   techs: ["Node", "Express", "TypeScript"]
// };
describe("Repositories", () => {
  beforeEach(async () => {
    await useDatabase(HOSTMONGO, MONGOBD);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    await disconnectDatabase();
  });

  it("should be able to give a like to the repository", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    let response = await request(app).post(
      `/repositories/${repository.body._id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repositories/${repository.body._id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400);
  });
});
