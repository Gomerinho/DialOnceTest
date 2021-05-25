const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/dial-once-test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :'));
db.once('open', () => {
  console.log('Database connected');
});

app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
