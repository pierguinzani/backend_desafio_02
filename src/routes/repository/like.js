const { RepositoryModel } = require("../../model/index");


const list = async (request, response) => {

  const { id } = request.params;

  // if (repositoryIndex < 0) {
  //   return response.status(400).json({ error: "Repository not found." })
  // }

  try {
    const result = await RepositoryModel.findOneAndUpdate(
      { _id: id }, 
      { 
         $inc: { likes: 1 } 
      }, {new: true });

    return response.json({ result });
  } catch (err) {
    //console.log(err);
    response
      .status(400)
      .json({ message: "Error when trying to increment a like" });
  }
};


module.exports = list;