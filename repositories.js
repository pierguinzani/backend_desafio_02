const request = require("supertest");
const app = require("../../../src");
const { useDatabase, disconnectDatabase } = require("../../database");
const { isUuid } = require("uuidv4");
const { RepositoryModel } = require("../../model");
const { CONNECTION_STRING } = require("../../../config");

describe("Repositories", () => {
  beforeEach(async () => {
    await useDatabase(CONNECTION_STRING);
  });

  afterEach(async () => {
    await disconnectDatabase();
  });

  // it("should be able to create a new repository", async () => {
  //   const response = await request(app)
  //     .post("/repositories")
  //     .send({
  //       url: "https://github.com/Rocketseat/umbriel",
  //       title: "Umbriel",
  //       techs: ["Node", "Express", "TypeScript"]
  //     });

  //   //expect(isUuid(response.body.id)).toBe(true);

  //   expect(response.body).toMatchObject({
  //     url: "https://github.com/Rocketseat/umbriel",
  //     title: "UMBRIEL",
  //     techs: ["Node", "Express", "TypeScript"],
  //     likes: 0
  //   });
  //   RepositoryModel.remove().exec();
  //   //await Wafer.deleteMany({}).exec();
  // });

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
    RepositoryModel.remove().exec();
  });

  it("should be able to update repository", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    const response = await request(app)
      .put(`/repositories/${repository.body._id}`)
      .send({
        url: "https://github.com/Rocketseat/unform",
        title: "Unform",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
      });

    //expect(isUuid(response.body.id)).toBe(true);

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
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
      });

    const response = await request(app)
      .put(`/repositories/${repository.body._id}`)
      .send({
        likes: 15
      });

    expect(response.body).toMatchObject({
      likes: 0
    });
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
