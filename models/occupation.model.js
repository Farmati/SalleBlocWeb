const mongoose = require('mongoose');
const {Schema}=require('mongoose');
var occupationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: 'This field is required.'
    },
    salle: { type: Schema.Types.ObjectId, ref: 'Salle' },
    _idSalle: { 
        type:String
    },
    crenaux: { type: Schema.Types.ObjectId, ref: 'Crenaux' },
     _idCrenaux: { 
        type:String
    },
});
mongoose.model('Occupation', occupationSchema);
module.exports = mongoose.model('Occupation',occupationSchema)
