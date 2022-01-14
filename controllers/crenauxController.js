const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Crenaux=mongoose.model('Crenaux');
 

router.get('/', (req, res) => {
    res.render("crenaux/addOrEdit",{
        viewTitle: "Insert new Crenaux"
    })
});

//Post
router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body._id == ''){
        console.log("insert");
        insertRecord(req, res);
    }
        else
        console.log("update");
});

function insertRecord(req, res) {
    var crenaux = new Crenaux();
    crenaux.dd = req.body.dd;
    crenaux.df = req.body.df;
    
    crenaux.save((err, doc) => {
        if (!err)
            res.redirect('crenaux/list');
        else {
            if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("crenaux/addOrEdit", {
                viewTitle: "Insert New Crenaux",
                crenaux: req.body
            });
        }
        else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    //  res.json('from list')
    Crenaux.find((err, docs) => {
        if (!err) {
            res.render("crenaux/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Crenaux list :' + err);
        }
    });
});
router.get('/all', (req, res) => {
    //  res.json('from list')
    Crenaux.find((err, docs) => {
        res.json(docs)
    });
});






module.exports=router;