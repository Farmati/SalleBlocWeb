const { request } = require('express');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Occupation = mongoose.model('Occupation');


router.get('/', (req, res) => {
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var date = new Date();
    var month = pad2(date.getMonth() + 1);//months (0-11)
    var day = pad2(date.getDate());//day (1-31)
    var year = date.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;
    /////curent Time //////////////////////////////
    var date1=new Date();
    date1.setHours(10);
    date1.setMinutes(31);
    var minutesOfDay = function (m) {
        return m.getMinutes() + m.getHours() * 60;
    }
    var time;
    end = new Date();
    end.setHours(10);
    end.setMinutes(30);
    var c1 = minutesOfDay(end) > minutesOfDay(date);
    /////seance 2 /////
    end2 = new Date();
    end2.setHours(12);
    end2.setMinutes(20);
    var c2 = minutesOfDay(end2) > minutesOfDay(date);
    /////seance 3 /////
    end3 = new Date();
    end3.setHours(15);
    end3.setMinutes(30);
    var c3 = minutesOfDay(end3) > minutesOfDay(date);
    if(c1){
        time="08:30 To 10:20";
    }else{
        if(c2){
            time="10:30 To 12:20"
        }else{
            if(c3){
                time="13:30 To 15:20"
            }else{
                time="15:30 To 17:20"
            }
        }
    }
  
    console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§  "+formattedDate)
Occupation.find({ "date": formattedDate,"_idCrenaux":time }, function (err, docs) {
    if (!err) {
        var salleA1=false;
        var salleA2=false;
        var salleB1=false;
        var salleB2=false;
        var salleB3=false;
        var salleB8=false;
        var salleB11=false;
        var salleC1=false;var salleC2=false;
         console.log("docs : "+docs);
         docs.forEach(element => {
            console.log(element._idSalle);
            if(element._idSalle=="Salle A1") salleA1=true;
            if(element._idSalle=="Salle A2") salleA2=true;
            if(element._idSalle=="Salle B1") salleB1=true;
            if(element._idSalle=="Salle B2") salleB2=true;
            if(element._idSalle=="Salle B3") salleB3=true;
            if(element._idSalle=="Salle B8") salleB8=true;
            if(element._idSalle=="Salle B11") salleB11=true;
            if(element._idSalle=="Salle C1") salleC1=true;
            if(element._idSalle=="Salle C2") salleC2=true;
         })
           console.log(salleA1);
        res.render("dash/dash", {
            salleA2:salleA2,
            salleA1:salleA1,
            salleB1:salleB1,
            salleB2:salleB2,
            salleB3:salleB3,
            salleB8:salleB8,
            salleB11:salleB11,
            salleC2:salleC2,
            salleC1:salleC1,
        });
    }
    else {
        console.log('Error in retrieving ensajistes list :' + err);
    }
});
})

module.exports = router;
