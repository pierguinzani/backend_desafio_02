const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
const { RepositoryModel } = require("../../model");
const { CONNECTION_STRING } = require("../../../config");

describe("Repositories", () => {
  beforeEach(async () => {
    await useDatabase(CONNECTION_STRING);
  });

  afterEach(async () => {
    await RepositoryModel.collection.drop();
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
