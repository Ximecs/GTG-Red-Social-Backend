const express = require("express");
const  {newPost,getPublication,getPublicationByUser} = require("../controllers/publication.controller");
const router = express.Router();
const { authValidation } = require("../util/middlewares/authValidation");

router.post('/newPost',authValidation,newPost)
router.get("/getPublication", authValidation,getPublication);

  
  module.exports = router;