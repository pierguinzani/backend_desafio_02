const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
const { RepositoryModel } = require("../../model");
const { HOSTMONGO, MONGOBD } = require("../../../config");

describe("Repositories", () => {
  beforeEach(async () => {
    await useDatabase(HOSTMONGO, MONGOBD);
  });

  afterEach(async () => {
    jest.clearAllMocks(); 
    jest.resetAllMocks();
    await disconnectDatabase();
  });

  it("should be able to list the repositories", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    const response = await request(app).get("/repositories");

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          _id: repository.body._id,
          url: "https://github.com/Rocketseat/umbriel",
          title: "UMBRIEL",
          techs: ["Node", "Express", "TypeScript"],
          likes: 0
        }
      ])
    );
  });
});

//afterEach(() => { jest.clearAllMocks(); jest.resetAllMocks(); });