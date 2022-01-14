const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Bloc=mongoose.model('Bloc');
 

router.get('/', (req, res) => {
    res.render("bloc/addOrEditBloc",{
        viewTitle: "Insert new bloc"
    })
});

//Post
router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var bloc = new Bloc();
    bloc.name = req.body.name;
    
    bloc.save((err, doc) => {
        if (!err)
            res.redirect('bloc/listBloc');
        else {
            if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("bloc/addOrEditBloc", {
                viewTitle: "Insert New bloc",
                bloc: req.body
            });
        }
        else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/listBloc', (req, res) => {
    //  res.json('from list')
    Bloc.find((err, docs) => {
        if (!err) {
            res.render("bloc/listBloc", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving bloc list :' + err);
        }
    });
});
router.get('/blocs', (req, res) => {
    //  res.json('from list')
    Bloc.find((err, docs) => {
        res.json(docs)
    });
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['fullNameError'] = err.errors[field].message;
                break;
            
            default:
                break;
        }
    }
}
function updateRecord(req, res) {
    Bloc.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('bloc/listBloc'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bloc/addOrEditBloc", {
                    viewTitle: 'Update blocs',
                    bloc: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Bloc.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("bloc/addOrEditBloc", {
                viewTitle: "Update blocste",
                bloc: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Bloc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/bloc/listBloc');
        }
        else { console.log('Error in bloc delete :' + err); }
    });
});


module.exports=router;