const uploadFromBuffer = require("../util/files/uploadFiles");
const Profile = require("../models/profiles.model");
const Account = require('../models/accounts.model')

const updatePhotoProfile = async (req, res) => {
  console.log(req.file);
  try {

    const resultUploadPhoto = await uploadFromBuffer(req.file, 'photoProfile');
    if (!resultUploadPhoto) {
      return res.status(400).json({
        ok: false,
        message: "No se pudo obtener url de la foto",
      });
    }
     console.log(req.user.id)
    const photoUpdated = await Profile.findOneAndUpdate(
      { idAccount: req.user.id },
      {
        photoProfile: resultUploadPhoto.url,
      }
    );

    if (!photoUpdated) {
      await Profile.create({
        idAccount: req.user.id,
        photoProfile: resultUploadPhoto.url,
      });
    };

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message
      
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ idAccount: req.user.id });

    if (!profile) {
      return res.status(404).json({
        ok: false,
        message: "Perfil no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error,
    });
  }
};
const getProfileByUser = async (req, res) => {
  try {
    console.log(req.body)
    const profile = await Profile.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "idAccount",
          foreignField: "_id",
          as: "accounts"
      }
      },
      {
        $unwind: "$accounts",

    },
    {
      $match: { $expr: { $eq: ['$idAccount', { $toObjectId: req.body.id }] } }
  },
    {
      $project: {
          photoProfile:'$photoProfile',profileName: '$accounts.fullName'
      }
  },
    ])

    if (!profile) {
      return res.status(404).json({
        ok: false,
        message: "Perfil no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error,
    });
  }
};


const searchProfile = async (req, res) => {
  try {
    let name = req.body.fullName
    const profile = await Account.find({ fullName: { $regex: '.*' + name + '.*' } })
    if (!profile) {
      return res.status(404).json({
        ok: false,
        message: "Perfil no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error,
    });
  }
}
module.exports = { updatePhotoProfile, getProfile, searchProfile,getProfileByUser };
