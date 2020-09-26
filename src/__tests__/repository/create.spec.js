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

  it("should be able to create a new repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    expect(response.body).toMatchObject({
      url: "https://github.com/Rocketseat/umbriel",
      title: "UMBRIEL",
      techs: ["Node", "Express", "TypeScript"],
      likes: 0
    });
  });
});
