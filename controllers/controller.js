const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Occupation = mongoose.model('Occupation');

router.get('/', (req, res) => {
    var dates = [];
    Occupation.find(function (err, docs) {
        docs.forEach(element => {
            if (dates.includes(element.date)) { }
            else { dates.push(element.date); }
        })
    })
    const myTimeout = setTimeout(u, 1500);
    function u() {
        res.render("main", {
            dates: dates,
            viewTitle: "Main Page"
        })
    }
});


router.post("/post", (req, res) => {
    var dates = [];
    Occupation.find(function (err, docs) {
        docs.forEach(element => {
            if (dates.includes(element.date)) { }
            else { dates.push(element.date); }
        })
    })
//     var pp=req.body.d;
//    // console.log(JSON.stringify(req.body.d).replace(" ",""))
//    pp=pp.toString();
//    console.log("rrrrrrrrrrrrrrr "+pp);
    Occupation.find( function (err, docs) {
     //   console.log("resultat    ::::::::::" + JSON.stringify(req.body.d).replace(" ",""));
       // console.log(docs)
        var tab = [];
        var sa1 = 0; var sa2 = 0;
        var sb1 = 0; var sb2 = 0; var sb3 = 0; var sb8 = 0; var sb11 = 0;
        var sc1 = 0; var sc2 = 0;
        console.log("Indexe ; "+req.body.d)
        
        docs.forEach(element => {
            Occupation.count({"_idSalle": element._idSalle }, function (err, docs) {
                if (element._idSalle == "Salle A1" && JSON.stringify(element.date) == JSON.stringify(req.body.d)){
                    sa1 = docs;
                } 
                if (element._idSalle == "Salle A2" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sa2 = docs;
                if (element._idSalle == "Salle B1" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sb1 = docs;
                if (element._idSalle == "Salle B2" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sb2 = docs;
                if (element._idSalle == "Salle B3" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sb3 = docs;
                if (element._idSalle == "Salle B8" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sb8 = docs;
                if (element._idSalle == "Salle B11" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sb11 = docs;
                if (element._idSalle == "Salle C1" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sc1 = docs;
                if (element._idSalle == "Salle C2" && JSON.stringify(element.date) == JSON.stringify(req.body.d)) sc2 = docs;

            })
        })
        const myTimeout = setTimeout(u, 1500);
        function u() {
            tab.push(sa1*25), tab.push(sa2*25);
            tab.push(sb1*25); tab.push(sb2*25); tab.push(sb3*25); tab.push(sb8*25); tab.push(sb11*25);
            tab.push(sc1*25); tab.push(sc2*25)
            console.log("tab " + tab)
            res.send({tab: tab})
            // res.render("main", {
            //     dates: dates,
            //     tab: tab,
            //     viewTitle: "Main Page"
            // })
        }
    })
    
})
/////////////////////////////////////////////////
// router.post("/", (req, res) => {
//    console.log(req.body.d)

//  })
module.exports = router;
