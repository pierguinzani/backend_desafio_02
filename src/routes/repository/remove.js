const { v4: uuid } = require('uuid');
const { RepositoryModel } = require("../../model/index");


const remove = async (request, response) => {
  const { id } = request.params;

  // if (repositoryIndex < 0) {
  //   return response.status(400).json({ error: "Repository not found." })
  // }

  try {

    const result = await RepositoryModel.findOneAndRemove(
      { _id: id },
    );
    return response.status(204).send()
  } catch (err) {
    //console.log(err);
    response
      .status(400)
      .json({ message: "Error when trying to delete a repository" });
  }
};


module.exports = remove;