const uploadFromBuffer = require('../util/files/uploadFiles')
const publications = require('../models/publications.model')
const { get } = require('../routes/auth.route')



const newPost = async (req, res) => {

    let publicationPicture = ''
    let publicationText = ''

    try {
        if (req.file) {
            publicationPicture = await uploadFromBuffer(req.file, 'photoPublications');

            if (!publicationPicture) {
                return res.status(400).json({
                    ok: false,
                    message: "No se pudo obtener url de la photo",
                });
            }
        }
        if (req.body.text) {
            publicationText = req.body.text
        }

        await publications.create({
            idAccount: req.user.id,
            publiPicture: publicationPicture,
            publicationText,
        })
        res.status(200).json({
            ok: true,
        });


    } catch (error) {
        res.status(400).jason({
            ok: false,
        })
    }
};

const getPublication = async (req, res) => {
    try {
        const publications = await publications.find().toArray();

        if (!publications) {
            return res.status(404).json({
                ok: false
            })
        }

        res.status(200).json({
            ok:true,
            data:publications,
        })
    
    
    } catch {
        res.status(400).json({
            ok: false
        })
    }
};

const getPublicationByUser = async (req, res) => {

}



module.exports = { newPost, getPublication, getPublicationByUser }