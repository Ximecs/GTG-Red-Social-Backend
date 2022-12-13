const uploadFromBuffer = require('../util/files/uploadFiles')
const Publications = require('../models/publications.model')
const { get } = require('../routes/auth.route')
const Counter = require('../models/counter.model')


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
        
           let publicationText = req.body.text
           let transport = req.body.transport
           let publicationTitle = req.body.publicationTitle
        

        await Publications.create({
            idAccount: req.user.id,
            publiPicture: publicationPicture,
            publicationText,
            transport,
            publicationTitle,
        })
        res.status(200).json({
            ok: true,
            message: "working"
        });


    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        })
    }
};

const getPublication = async (req, res) => {
    try {
        const publications = await Publications.find({}).sort({createdAt:-1});

        if (!publications) {
            return res.status(404).json({
                ok: false
            })
        }

        res.status(200).json({
            ok: true,
            data: publications,
        })


    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        })
    }
};
const counterFn = async (counterName) => {
    let contador = await Counter.findOne({ id: counterName });
    newValue = contador.seq_value + 1;
    await Counter.findOneAndUpdate({ id: counterName }, { seq_value: newValue });
    return contador.seq_value;
};

const getPublicationByUser = async (req, res) => {

}



module.exports = { newPost, getPublication, getPublicationByUser }