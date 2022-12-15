const uploadFromBuffer = require('../util/files/uploadFiles')
const Publications = require('../models/publications.model')
const { get } = require('../routes/auth.route')
const Counter = require('../models/counter.model');
const Accounts = require('../models/accounts.model');



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
           let ciudad=req.body.ciudad
           let presupuesto=req.body.presupuesto


        

        await Publications.create({
            idAccount: req.user.id,
            publiPicture: publicationPicture,
            transport,
            publicationTitle,
            ciudad,
            presupuesto,
            publiText:publicationText
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
        console.log(publications)
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
const getPublicationByUser = async (req, res) => {
    try {
        console.log(req.body.id )
        // const publications = await Publications.find({idAccount:req.body.id}).sort({createdAt:-1});
        //  console.log(req.body)
        // if (!publications) {
        //     return res.status(404).json({
        //         ok: false
        //     })
        // }

        // const account = await accounts.find({_id:req.body.id})
        // publications.fullName = account.fullName
        // console.log(publications)

        const publications = await Publications.aggregate([
            {
            $lookup:{
                from: "accounts",
                localField:"idAccount",
                foreignField:"_id",
                as:"accounts"
            }
        },
        
        {
            $unwind:"$accounts",
           // $match: {idAccount: "637c0db89e0819a4e9dd1744"}
        },
        {
            $match:{$expr:{$eq:['$idAccount',{$toObjectId:req.body.id}]}}
        },
        
        {
            $project:{
                profileName:'$accounts.fullName',publicationTitle:'$publicationTitle',transport:'$transport',idAccount:'$idAccount',
                publiDate: '$publiDate',publiPicture:"$publiPicture",ciudad:"$ciudad",presupuesto:"$presupuesto",
            }
        },

    ],
    function(data){
    console.log(data)
    }
    );

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





module.exports = { newPost, getPublication, getPublicationByUser }