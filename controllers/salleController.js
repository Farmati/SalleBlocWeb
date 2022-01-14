const qr = require('qrcode');
const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Salle=mongoose.model('Salle');
const Bloc=mongoose.model('Bloc'); 
const Occupation=mongoose.model('Occupation');

router.get('/', (req, res) => {
    Bloc.find((err, docs) => {
    res.render("salle/addOrEditsalle",{
        viewTitle: "Insert new salle",
        blocs:docs
    })
});
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
    var salle = new Salle();
    salle.name = req.body.name;
    salle.bloc=req.body.bloc;
    salle.etat=req.body.etat;

    ////////////QR CODE
    let s = {
        name:salle.name,
        bloc: salle.bloc,
    };
      
    let strData = JSON.stringify(s)
    qr.toString(strData, {type:'terminal'},function (err, code) {
        if(err) return console.log("error occurred")
        console.log("+++++"+code)
    });
      
    qr.toDataURL(strData, function (err, code) {
        if(err) return console.log("error occurred")
        salle.qrCode=code;
        salle.save((err, doc) => {
            if (!err)
                res.redirect('salle/listsalle');
            else {
                
                if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                Bloc.find((err, docs) => {
                    if (!err) {
                    res.render("salle/addOrEditsalle", {
                        viewTitle: "Insert New salle",
                        salle: req.body,
                        blocs:docs
                       
                    });
                }
                else {
                    console.log('Error Tema :' + err);
                }
                })
                
            }
            else
                    console.log('Error during record insertion : ' + err);
            }
        });
    })
 
}

router.get('/listsalle', (req, res) => {
    //  res.json('from list')
    Salle.find((err, docs) => {
        if (!err) {
            res.render("salle/listsalle", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving salle list :' + err);
        }
    });
});
router.get('/salles', (req, res) => {
    
    // let data = {
    //     id: 1,
    //     name: "User",
    //     email: "user@gmail.com"
    // };
      
    // let strData = JSON.stringify(data)
      
    // qr.toString(strData, {type:'terminal'},function (err, code) {
    //     if(err) return console.log("error occurred")
    //     console.log("+++++"+code)
    // });
      
    // qr.toDataURL(strData, function (err, code) {
    //     if(err) return console.log("error occurred")
    //     console.log("////////"+code)
    // })
   
    Salle.find((err, docs) => {
        res.json(docs);
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
    
    Salle.findOneAndUpdate({ _id: req.body._id },{name :req.body.name,bloc:req.body.bloc,etat:req.body.etat}, { new: true }, (err, doc) => {
        if (!err) { res.redirect('salle/listsalle'); }
        else {
            
            console.log("docs2: "+Bloc.find(err, docs));
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                Bloc.find((err, docs) => {
                res.render("salle/addOrEditsalle", {
                    viewTitle: 'Update salles',
                    salle: salle,
                    blocs:docs
                });
            })
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            Bloc.find((err, docs) => {
            res.render("salle/addOrEditsalle", {
                viewTitle: "Update salleste",
                salle: doc,
                blocs:docs
            });
        })
        }
    });
});
router.get('/view/:id', (req, res) => {
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
            Bloc.find((err, docs) => {
            res.render("salle/viewSalle", {
                viewTitle: "View",
                salle: doc,
            });
        })
        }
    });
});


router.get('/qrCode/:id', (req, res) => {
    Salle.findById(req.params.id, (err, doc) => {
        if (!err) {
           res.json(doc.qrCode)
        }
    });
});

router.get('/salleOccupation/:id', (req, res) => {
    Salle.findById(req.params.id, (err, doc) => {
       Occupation.find( { _idSalle: doc.name } ).then(items => {
        res.render("salle/salleOccupation", {
            list: items,
            salle:doc.name
        });
       });
    });
});



router.delete('/delete1/:id', (req, res) => {
    Salle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/salle/listsalle');
        }
        else { console.log('Error in salle delete :' + err); }
    });
});

router.get('/delete/:id', (req, res) => {
    Salle.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/salle/listsalle');
        }
        else { console.log('Error in salle delete :' + err); }
    });
});

router.get('/deleteOccupation/:id', (req, res) => {
    Occupation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/salle');
        }
        else { console.log('Error in occupation delete :' + err); }
    });
});


module.exports=router;