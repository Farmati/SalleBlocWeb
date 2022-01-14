const mongoose = require('mongoose');

var crenauxSchema = new mongoose.Schema({
    dd: {
        type: String,
    },
    df: {
        type: String
        
    },
    
});


mongoose.model('Crenaux', crenauxSchema);