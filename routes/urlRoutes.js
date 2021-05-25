const mongoose = require('mongoose');
const Url = mongoose.model('urls');

module.exports = app => {
  app.get(`/api/url`, async (req, res) => {
    let urls = await Url.find().sort({ _id: -1 });
    return res.status(200).send(urls);
  });

  app.post(`/api/url`, async (req, res) => {
    let url = await (await Url.create(req.body)).save();
    return res.status(201).send({
      error: false,
      url,
    });
  });

  app.delete(`/api/url/:id`, async (req, res) => {
    const { id } = req.params;

    let url = await Url.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      url,
    });
  });
};
