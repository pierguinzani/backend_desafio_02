const { Router } = require("express");
// const { validateRepositoryParams } = require("../../middleware");

const create = require("./create");
const list = require("./list");
const update = require ("./update");
const remove = require ("./remove");
const like = require ("./like");

const repository = Router();

repository.post("/", create);
repository.get("/", list);
repository.put("/:id", update);
repository.delete("/:id", remove);
repository.post("/:id/like", like);


module.exports = repository;
