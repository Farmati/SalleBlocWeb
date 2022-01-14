require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars = require('handlebars');
const Pusher = require('pusher');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const controller = require('./controllers/controller');
const ensajController = require('./controllers/ensajController');
const blocController = require('./controllers/blocController');
const salleController = require('./controllers/salleController');
const crenauxController = require('./controllers/crenauxController');
var occupationController = require('./controllers/occupationController');
var dashController = require('./controllers/dashController');
const Occupation = require("./models/occupation.model")
const mongoose = require('mongoose');
const Bloc = mongoose.model('Bloc');
const Salle = mongoose.model('Salle');
const Occupation1 = mongoose.model('Occupation');
const Ensajiste = mongoose.model('Ensaj');
const pusher = new Pusher({
  appId: '<INSERT_APP_ID>',
  key: '<INSERT_APP_KEY>',
  secret: '<INSERT_APP_SECRET>',
  cluster: '<INSERT_APP_CLUSTER>',
  encrypted: true,
});
var login = false;
const channel = 'occupation';
var app = express();
/////////////////////////////ws
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', (socket) => {
  console.log('user connected')

  var labels = [];
  var donnees = [];
  var iddSalle;
  var iddBloc;
  var iddEnsajiste;
  var iddOccupation;
  Salle.count({}, function (err, result3) {
    iddSalle = result3;
  });
  Bloc.count({}, function (err, result) {
    iddBloc = result;
  });
  Occupation1.count({}, function (err, result) {
    iddOccupation = result;
  });
  Ensajiste.count({}, function (err, result3) {
    iddEnsajiste = result3;
  });

  Bloc.find((err, docs) => {
    docs.forEach(element => {
      //   console.log(element.name)
      labels.push(element.name);
      Salle.count({ bloc: element.name }, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          // console.log(element.name+" "+result);
          donnees.push(result);
        }
      });
    });
  });
  const myTimeout = setTimeout(myGreeting, 1500);
  var data;
  function myGreeting() {
    data = {
      labels: labels,
      datasets: [{
        label: 'Salle Par Bloc',
        backgroundColor: [
          'rgba(201, 203, 207, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(201, 203, 207)',
          'rgba(54, 162, 235)',
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderWidth: 1,
        data: donnees,
      }]
    };
    socket.emit("display", data, iddSalle, iddBloc, iddOccupation, iddEnsajiste);
  }

  const changeStream = Occupation.watch();
  changeStream.on('change', next => {
    const resumeToken = changeStream.resumeToken;
    const operation = next.operationType;
    // console.log(next.fullDocument._idSalle)
    if (next.operationType === 'insert') {
      //  console.log(next.fullDocument._idSalle)
      Occupation1.count({}, function (err, result) {
        iddOccupation = result;

      });
      socket.emit("test", next.fullDocument._idSalle, next.fullDocument.date, next.fullDocument._idCrenaux);

    }
  });


})

//....swager

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
const { handlebars } = require('hbs');
const res = require('express/lib/response');
const { Socket } = require('socket.io');
const { on } = require('events');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

http.listen(process.env.PORT || 3000, () => {
  console.log('Express server started at port : 3000');
});

app.get((req, res) => {
  res.send("jobs api");
})
app.use('/', controller);
    app.use('/ensaj', ensajController);
    app.use('/bloc', blocController);
    app.use('/salle', salleController);
    app.use('/crenaux', crenauxController);
    app.use('/occupation', occupationController);
    app.use('/dash', dashController);


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});
app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  if (username == "rihabfarmati@gmail.com" && password == "123456") {
    login = true;
    
    res.writeHead(302, {
      'Location': '/'
    });
    res.end();
  }
});
console.log("ééééé" + login)
if (login) {

}

// {
//     "_id": 0,
//     "fullName": "test",
//     "email": "Test@gmail.com",
//     "filiere":"test1"
//   }


//Cluster0

// https://bloc-salle.herokuapp.com