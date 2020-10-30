const express = require('express');
const authMiddleware = require('../middlewares/auth');
var multiparty = require('multiparty');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
const multerConfig = require("../config/multer");

const GitUser = require('../models/gitUser');
const Repos = require('../models/repos');
const Image = require('../models/image');

const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => { 

  try {
    const gitUser = await GitUser.find().populate();
    return res.send({ gitUser });
  } 
  catch (err) {
    return res.status(400).send({ error: 'Erro' });
  }

});

 
router.post('/', multer(multerConfig).single("img"), async (req, res) => {
  try{
    const { originalname: name, size, key, location: url = "" } = req.file;
    const { user_name, repos } = req.body;

    const image = await Image.create({
      name,
      size,
      key,
      url
    });

    const gitUser = await GitUser.create({ user_name, repos, image });

    console.log(req.file);

    await gitUser.save();

    return res.send({ gitUser });

  }catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro' });
    }
});



router.get('/:gitUserId', async (req, res) => { 
  try {
    const gitUser = await GitUser.findById(req.params.gitUserId).populate();
    return res.send({ gitUser });
  }catch(err){
      return res.status(400).send({ error: 'Erro' });
    }
});

router.put('/:gitUserId', async (req, res) => { 
  try {
    const { user_name, repos } = req.body;

    const gitUser = await GitUser.findByIdAndUpdate(req.params.gitUserId, {
    user_name,
    repos
    }, {new: true});

    await gitUser.save();

    return res.send({ gitUser });

  }catch(err){ 
    console.log(err);
    return res.status(400).send({ error: 'Erro' });
  }
});

router.delete('/:gitUserId', async (req, res) => { 
  try {
    await GitUser.findByIdAndRemove(req.params.gitUserId).populate('gitUser');
      
    return res.send();
  }catch(err){
    return res.status(400).send({ error: 'Error' });
  }
});

module.exports = app => app.use('/gitUser', router);

  //    var form = new multiparty.Form();
  //    form.parse(req, function(err, fields, files) {
  //    console.log(fields.user_name+" "+fields.repos+" "+fields.image);
  // })