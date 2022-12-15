const express = require("express");
const { googleAccount } = require("../controllers/account.controller");
const login = require("../controllers/auth.controller");
const { authValidation } = require("../util/middlewares/authValidation");
const router = express.Router();

router.post("/login", login);
router.post("/authValidation", authValidation, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

router.post("/googleLogin", googleAccount, login)

module.exports = router;
