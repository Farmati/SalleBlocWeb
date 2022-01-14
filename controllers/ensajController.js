const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Ensaj=mongoose.model('Ensaj');
 

router.get('/', (req, res) => {
    res.render("ensaj/addOrEdit",{
        viewTitle: "Insert new Ensajiste"
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
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var ensaj = new Ensaj();
    ensaj.fullName = req.body.fullName;
    ensaj.email = req.body.email;
    ensaj.filiere = req.body.filiere;
    
    ensaj.save((err, doc) => {
        if (!err)
            res.redirect('ensaj/list');
        else {
            if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("ensaj/addOrEdit", {
                viewTitle: "Insert New Ensajiste",
                ensaj: req.body
            });
        }
        else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    //  res.json('from list')
    Ensaj.find((err, docs) => {
        if (!err) {
            res.render("ensaj/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving ensajistes list :' + err);
        }
    });
});
router.get('/ensajistes', (req, res) => {
    //  res.json('from list')
    Ensaj.find((err, docs) => {
        res.json(docs)
    });
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
function updateRecord(req, res) {
    Ensaj.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('ensaj/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("ensaj/addOrEdit", {
                    viewTitle: 'Update Ensajiste',
                    ensaj: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Ensaj.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("ensaj/addOrEdit", {
                viewTitle: "Update Ensajste",
                ensaj: doc
            });
        }
    });
});
router.delete('/delete1/:id', (req, res) => {
    Ensaj.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/ensaj/list');
        }
        else { console.log('Error in ensajiste delete :' + err); }
    });
});
router.get('/delete/:id', (req, res) => {
    Ensaj.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/ensaj/list');
        }
        else { console.log('Error in ensajiste delete :' + err); }
    });
});


module.exports=router;