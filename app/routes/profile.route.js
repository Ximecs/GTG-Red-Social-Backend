const express = require("express");
const {
  updatePhotoProfile,
  getProfile,
  searchProfile,
  updatePhotoBanner,
} = require("../controllers/profile.controller");
const router = express.Router();
const multer = require("multer");
const { authValidation } = require("../util/middlewares/authValidation");

const upload = multer();

router.post(
  "/updatePhotoProfile",
  authValidation,
  upload.single("photo"),
  updatePhotoProfile
);
router.get("/getProfile", getProfile);
router.get('/searchProfile',authValidation,searchProfile)
router.post("/updatePhotoBanner",authValidation,upload.single("photo"),updatePhotoBanner);

module.exports = router;
