const express = require("express");
const  {newPost,getPublication,getPublicationByUser} = require("../controllers/publication.controller");
const router = express.Router();
const { authValidation } = require("../util/middlewares/authValidation");
const multer = require("multer");

const upload = multer();

router.post('/newPost',authValidation,upload.single("publiPicture"),newPost)
router.post("/getPublication",getPublication);
router.post("/getPublicationByUser",getPublicationByUser);


  
  module.exports = router;