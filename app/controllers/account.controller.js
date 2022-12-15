const Account = require("../models/accounts.model");
const bcrypt = require("bcrypt");
const Profile = require("../models/profiles.model")
const { hasUserDefinedProperty } = require("mongoose/lib/utils");
const saltRounds = 10;

const getAccounts = (req, res) => {
  console.log("accounts/ api works!");
  res.send("accounts/ api works!");
};

const newAccount = async (req, res) => {
  try {
    const user = req.body;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    if (passwordHash) {
      user.password = passwordHash;
    }

    await Account.create(user);
    res.status(200).json({
      message: "Account created!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


const googleAccount = async (req,res)=>{

  try{

    const user = req.body;

    const account = await Account.findOneAndUpdate(
      {email: user.email},
      {fullName: user.name}
    );

    if (account) {
      Profile.findOneAndUpdate(
        {idAccount: account._id},
        {photoProfile: user.photoUrl}
      );

      return next();
    }

    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    const newAccount = await Account.create({
      fullName: user.name,
      email: user.email,
      password: passwordHash,
    });

    if (newAccount){
      Profile.create({
        idAccount: newAccount._id,
        photoProfile: user.photoUrl,
      });
    }
    return next();
  }
  catch (error){

    res.status(400).json({
      ok: false,
      message: error.message
    })

  }
};

module.exports = {
  newAccount,
  getAccounts,
  googleAccount,
}