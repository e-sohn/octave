const express = require('express');
const { Artist } = require('../models');

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json({ artists });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

artistRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const artist = await Artist.create({
      name,
    });
    res.json({ artist });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

artistRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.destroy({
      where: {
        id
      }
    });
    res.json({ artist });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = artistRouter;