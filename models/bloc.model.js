const mongoose = require('mongoose');

var blocSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    
});



mongoose.model('Bloc', blocSchema);