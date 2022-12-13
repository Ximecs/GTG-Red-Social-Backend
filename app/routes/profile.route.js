const express = require("express");
const {
  updatePhotoProfile,
  getProfile,
  searchProfile,
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
router.get("/getProfile", authValidation, getProfile);
router.get('/searchProfile',authValidation,searchProfile)

module.exports = router;
