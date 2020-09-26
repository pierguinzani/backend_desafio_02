const mongoose = require("mongoose");

const RepositorySchema = new mongoose.Schema({

  title: {
    type: String,
    uppercase: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  techs: {
    type: [String],
    uppercase: true,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
},
  {
    versionKey: false // You should be aware of the outcome after set to false
  });

const RepositoryModel = mongoose.model("repository", RepositorySchema);

module.exports = { RepositoryModel };
