const  mongoose  = require('../database/index');
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const fileName = require('../config/multer');

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ImageSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${APP_URL}/files/${this.key}`;
  }
});


module.exports = mongoose.model("Image", ImageSchema);