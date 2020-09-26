const { v4: uuid } = require('uuid');
const { RepositoryModel } = require("../../model/index");


const create = async (request, response) => {
  
  const { title, url, techs } = request.body;
  const repository = { title, url, techs, likes: 0 };

  try {

    const result = await RepositoryModel.create(repository);
    return response.json(result);
  } catch (err) {
    //console.log(err);
    response
      .status(400)
      .json({ message: "Error when trying to create a repository" });
  }
};


module.exports = create;