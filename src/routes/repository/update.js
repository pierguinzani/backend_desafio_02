const { v4: uuid } = require('uuid');
const { RepositoryModel } = require("../../model/index");


const update = async (request, response) => {
  
  const { id } = request.params;
  console.log("aaaaaaaaaaaaaaaa")
  console.log(request)

  if (request.body.likes != undefined) {
    return response.json({ error: "Error trying to update the amount of likes" });
  }

   // if (repositoryIndex < 0) {
  //   return response.status(400).json({ error: "Repository not found." })
  // }

  try {

    const result = await RepositoryModel.findOneAndUpdate(
      { _id: id },
      { $set: request.body },
      {new: true},
    );
    return response.json(result);
  } catch (err) {
    //console.log(err);
    response
      .status(400)
      .json({ message: "Error when trying to update a repository" });
  }

};


module.exports = update;