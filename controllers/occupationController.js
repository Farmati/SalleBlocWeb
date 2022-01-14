const express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Occupation=mongoose.model('Occupation');
const Salle=mongoose.model('Salle');
const Crenaux=mongoose.model('Crenaux');
const service=require("../server");

router.get('/', (req, res) => {
    Salle.find((err, docs1) => {
        if (!err) {
           // console.log(docs1);
            Crenaux.find((err, docs) => {
                if (!err) {
                  //  console.log(docs);
                    res.render("occupation/addOrEdit", {
                        salle: docs1,
                        crenaux:docs,
                        viewTitle: "Insert Ocupation"
                    
                    });
                   
                }
                else {
                    console.log('Error in retrieving blocs list :' + err);
                }
            });
        }
        else {
            console.log('Error in retrieving blocs list :' + err);
        }
    });
});



//Post
router.post('/', (req, res) => {
  //  console.log(req.body)
    if (req.body._id == ''){
        console.log("insert");
        insertRecord(req, res);
    }
        else
        console.log("update");
});
router.post('/post', (req, res) => {
    console.log(req.body)
    if (req.body._id == ''){
        console.log("insert");
        insertRecord2(req, res);
        
    }
        else
        console.log("update");
});
function insertRecord2(req, res) {
    var occupation = new Occupation();
    occupation.date=req.body.date;
    occupation._idSalle = req.body.salle;
            occupation._idCrenaux =req.body.crenaux;
             ////// test //////
             Occupation.find({"_idSalle":occupation._idSalle,"_idCrenaux":occupation._idCrenaux,"date":occupation.date},function(err,docs){
                console.log("++++++++++++++++++++++++++++++++++++++++++++"+docs);
                if(docs!=""){
                    res.json(docs);
                }else{
                    occupation.save((err, doc) => {
                        if (!err){ 
                            console.log("redirection ");
                            res.redirect('occupation/list');}
                            
                        else {
                            console.log("error here :"+err)
                            if (err.name == 'ValidationError') {
                                
                        }
                        else
                                console.log('Error during record insertion : ' + err);
                        }
                })
                }
            });
            
}
function insertRecord(req, res) {
    var occupation = new Occupation();
    occupation.date=req.body.date;
   
    Salle.findById(req.body.salle,function(err,docs){
        occupation._idSalle = docs.name;
        Crenaux.findById(req.body.crenaux,function(err,docs){
            occupation._idCrenaux = docs.dd+" to "+docs.df;
            ////// test //////
            Occupation.find({"_idSalle":occupation._idSalle,"_idCrenaux":occupation._idCrenaux},function(err,docs){
                console.log("++++++++++++++++++++++++++++++++++++++++++++"+docs);
            });
            ///occupation/////
            occupation.save((err, doc) => {
                if (!err){ 
                   res.redirect('occupation/list');
                }
                else {
                    console.log("error here :"+err)
                    if (err.name == 'ValidationError') {
                    res.render("occupation/addOrEdit", {
                        viewTitle: "Insert New occupation",
                        crenaux: req.body
                    });
                }
                else
                        console.log('Error during record insertion : ' + err);
                }
        })  
        })
    });
}

router.get('/list', (req, res) => {
//    console.log("+++++");
    //  res.json('from list')
    Occupation.find((err, docs) => {
        if (!err) {
            Crenaux.findById(req.body.salle,function(err,docs1){
                res.render("occupation/list", {
                    list: docs
                });
            })
        }else {
                console.log('Error in retrieving Crenaux list :' + err);
            }
            
    });
});
router.get('/all', (req, res) => {
    //  res.json('from list')
    Occupation.find((err, docs) => {
        res.json(docs)
    });
});
router.get('/list', (req, res) => {
    //  res.json('from list')
    Occupation.find((err, docs) => {
        if (!err) {
            res.render("occupation/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving occ list :' + err);
        }
    });
});

router.delete('/delete1/:id', (req, res) => {
    Occupation.findByIdAndRemove(req.params.id, (err, doc) => {
       
    });
});
router.get('/delete/:id', (req, res) => {
    Occupation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/occupation/list');
        }
        else { console.log('Error in Occupation delete :' + err); }
    });
});







module.exports.index  = function(){
    console.log("heloooooooooooooooooooooooooooooooo1");
    socket.on('connection',function(newsreel){
        console.log("heloooooooooooooooooooooooooooooooo");
        endpoint.emit(newsreel); 
    });
}


module.exports=router;