const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://rihab:rihabfarmati@cluster0.vaop8.mongodb.net/test', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') 
    
}
    else { console.log('Error in DB connection : ' + err) }
});

require('./ensaj.model');
require('./bloc.model');
require('./crenaux.model');
require('./occupation.model');
require('./salle.model');