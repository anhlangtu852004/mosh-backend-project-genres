const express = require("express");
const route = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const schemaGenres = new mongoose.Schema({
  name: { type: String, require: true },
});

const GenresModel = mongoose.model("Video", schemaGenres);

route.get("/:id", (req, res) => {
  GenresModel.findById(req.params.id)
    .then((video) => {
      res.send(video);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(404).send("nhap sai id video");
    });
});

route.get("/", (req, res) => {
  res.send("this is genres page");
});

module.exports = route;

function validateGenres(bodyResquest) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(bodyResquest);
}

async function getGenres(id) {
  try {
    const result = await GenresModel.findById(id);
    // console.log(result);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

// getGenres("62dad44878fa6e35af627868");
