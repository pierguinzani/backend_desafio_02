const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
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
  it("should be not able to create a new repository", async () => {
    const response = await request(app)
      .post("/repositories")
      .send({
        //url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

      expect(response.body.message).toBe('Error when trying to create a repository');
  });
});

