const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
  name: String,
  url: String,
});

mongoose.model('urls', urlSchema);
