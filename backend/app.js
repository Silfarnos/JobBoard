const express = require('express');
const mongoose = require('mongoose');
const offerRoutes = require('./routes/offer');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const emailRoutes = require('./routes/emailverification');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let myDbConnection = process.env.myDbConnection
let secretToken = process.env.token



//Connexion à à la base de donnée mongoDB
mongoose.connect(myDbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée ! ' + error));
;

const app = express();
app.use(express.json());
//Modification du middleware crossOriginRessourcePolicy de helmet pour autoriser l'affichage des images depuis tout site

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//Informations CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Routes que va suivre l'API à chaque appel
app.use(fileUpload());
app.use('/api/auth', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/verify', emailRoutes);

app.get('/api/checktoken', (req, res) => {
  try{

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretToken );

    res.status(201).json({message: "true"});

  }catch(error){
    res.status(401).json({error: 'Token is not valid'});
  }
})



module.exports = app;