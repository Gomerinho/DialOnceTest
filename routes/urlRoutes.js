const mongoose = require('mongoose');
const Url = mongoose.model('urls');

module.exports = app => {
  //Route get qui permet d'obtenir les liens de l'api
  app.get(`/api/url`, async (req, res) => {
    let urls = await Url.find().sort({ _id: -1 });
    return res.status(200).send(urls);
  });

  //Route post qui permet de créer un nouveau lien
  app.post(`/api/url`, async (req, res) => {
    let url = await (await Url.create(req.body)).save();
    return res.status(201).send({
      error: false,
      url,
    });
  });
};
