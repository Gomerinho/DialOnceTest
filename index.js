const express = require('express');
const mongoose = require('mongoose');

const Url = require('./models/Url');

const app = express();

//Connection à la base de donnée
mongoose.connect('mongodb://localhost:27017/dial-once-test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Vérification de la connexion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :'));
db.once('open', () => {
  console.log('Database connected');
});

//Toutes les envoie et requêtes des api se fait sous format JSON
app.use(express.json());

//Permet de réaliser les requêtes fetch
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

require('./routes/urlRoutes')(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
