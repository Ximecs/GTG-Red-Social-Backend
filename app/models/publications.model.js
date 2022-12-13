const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicationsSchema = new Schema({
    idAccount: {
        type: Schema.ObjectId,
        ref: "Account",
        required: true,
    },
    publiDate: {
        type: String,

    },
    publiPicture:{
        type:String,
        
    },
    publicationTitle:{
     type:String,
     required: true,

    },
    transport:{
        type:String,
      required: true,
      details:{
        type:String,
      }

    },
    departamentos:{
        type:String,
    },
    ciudad:{
        type:String,
    },
    presupuesto:{
        type:String,
        temporada:{
            type:String,
        }
    },
    
    publiText:{
        type:String,
    }
    

},
{
    timestamps: true,
  }
);
const publications = mongoose.model("Publications",publicationsSchema)
module.exports = publications