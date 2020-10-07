const express = require("express"),
cors = require("cors"),
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./utils/swagger.json');
// const { v4: uuid } = require('uuid');
// const { RepositoryModel } = require("../src/model/index");

const { repository } = require("./routes");


const app = express();

app.use(express.json());
app.use(cors());

// const repositories = [];

app.get("/", (req, res) => {
  return res.send("Welcome to my api!");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/repositories", repository);

module.exports = app;











// app.get("/repositories", async(request, response) => {
//   try {

//     const result = await RepositoryModel.find({});
//     return response.send(result);
//   } catch (err) {
//     console.log(err);
//     response
//       .status(500)
//       .json({ message: "Error when trying to list all repositories"});
//   }
//   return response.json(repositories)
// });

// app.post("/repositories", async(request, response) => {
//   const { title, url, techs } = request.body;
//   const repository = { title, url, techs, likes: 0 };

//   try {

//     const result = await RepositoryModel.create(repository);
//     return response.json(result);
//   } catch (err) {
//     console.log(err);
//     response
//       .status(500)
//       .json({ message: "Error when trying to create a repository" });
//   }
// });


// app.put("/repositories/:id", async(request, response) => {
//   const { id } = request.params;

//   if (request.body.likes != undefined) {
//     return response.json({ error: "Error trying to update the amount of likes" });
//   }

//    // if (repositoryIndex < 0) {
//   //   return response.status(400).json({ error: "Repository not found." })
//   // }

//   try {

//     const result = await RepositoryModel.findOneAndUpdate(
//       { _id: id },
//       { $set: request.body },
//       {new: true},
//     );
//     return response.json(result);
//   } catch (err) {
//     console.log(err);
//     response
//       .status(500)
//       .json({ message: "Error when trying to update a repository" });
//   }

// });

// app.delete("/repositories/:id", async(request, response) => {
//   const { id } = request.params;

//   // if (repositoryIndex < 0) {
//   //   return response.status(400).json({ error: "Repository not found." })
//   // }

//   try {

//     const result = await RepositoryModel.findOneAndRemove(
//       { _id: id },
//     );
//     return response.json(result);
//   } catch (err) {
//     console.log(err);
//     response
//       .status(500)
//       .json({ message: "Error when trying to delete a repository" });
//   }

//   return response.status(204).send()
// });

// app.post("/repositories/:id/like", async(request, response) => {
//   const { id } = request.params;

//   // if (repositoryIndex < 0) {
//   //   return response.status(400).json({ error: "Repository not found." })
//   // }

//   try {
//     const result = await RepositoryModel.findOneAndUpdate(
//       { _id: id }, 
//       { 
//          $inc: { likes: 1 } 
//       }, {new: true });

//     return response.json({ result });
//   } catch (err) {
//     console.log(err);
//     response
//       .status(500)
//       .json({ message: "Error when trying to increment a like" });
//   }
  
// });

