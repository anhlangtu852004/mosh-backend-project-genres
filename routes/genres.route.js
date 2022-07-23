const express = require("express");
const route = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const schemaGenres = new mongoose.Schema({
  name: { type: String, required: true },
});

const GenresModel = mongoose.model("Video", schemaGenres);

//get /api/genres/:id
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

//delete /api/genres
route.delete("/:id", (req, res) => {
  GenresModel.findByIdAndRemove(req.params.id)
    .then((video) => {
      res.send(video);
      console.log("da xoa thanh cong", video);
    })
    .catch((err) => res.status(404).send(err.message));
});

//post /api/genres/
route.post("/", (req, res) => {
  const { error, value } = validateGenres(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  GenresModel.create(req.body)
    .then((video) => {
      console.log(video);
      res.send(video);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(404).send(err.message);
    });
});

//get /api/genres
route.get("/", (req, res) => {
  GenresModel.find()
    .then((videos) => {
      res.send(videos);
    })
    .catch((err) => res.status(500).send(err.message));
});

//patch /api/genres/:id
route.put("/:id", (req, res) => {
  GenresModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((video) => {
      console.log(video);
      res.send(video);
    })
    .catch((err) => res.status(404).send(err.message));
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
