var multiparty = require('multiparty');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const multerConfig = require("../config/multer");

router.get("/", async (req, res) => {
  const image = await Image.find();

  return res.json(image);
});

router.post("/", multer(multerConfig).single("img"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const image = await Image.create({
    name,
    size,
    key,
    url
  });
  console.log(req.file);
  return res.json(image);
});

// routes.delete("/image:id", async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   await post.remove();

//   return res.send();
// });


  module.exports = app => app.use('/gitUser/:gitUserId/images', router);