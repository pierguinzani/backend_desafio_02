const { RepositoryModel } = require("../../model/index");


const list = async (request, response) => {

  try {
    const result = await RepositoryModel.find({});
    return response.send(result);
  } catch (err) {
    //console.log(err);
    response
      .status(500)
      .json({ message: "Error when trying to list all repositories" });
  }
  return response.json(repositories)
};


module.exports = list;