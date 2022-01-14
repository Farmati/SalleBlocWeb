const mongoose = require('mongoose');

var blocSchema = new mongoose.Schema({
    id: {
        type: Number,
        
    },
    name: {
        type: String,
        required: 'This field is required.'
    },
    
});

var salleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    bloc: {
        type: String,
        required: 'This field is required.'
    },
    etat: {
        type: String,
        required: 'This field is required.'
    },
    qrCode: {
        type: String,
    },


    
});

mongoose.model('Salle', salleSchema);