const express = require('express');
const { Venue } = require('../models');
const { restrict } = require('../auth');

const venueRouter = express.Router();

// Get all venues
venueRouter.get('/', restrict, async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json({ venues });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Get a specific venue
venueRouter.get('/:venue_name', restrict, async (req, res) => {
  try {
    const venue = await Venue.findOne({
      where: {
        title: req.params.venue_name
      }
    });
    res.json({ venue });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Add a venue
venueRouter.post('/', restrict, async (req, res) => {
  try {
    const { title, picture } = req.body;
    const venue = await Venue.create({
      title,
      picture
    });
    res.json({ venue });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Delete a venue
venueRouter.delete('/:id', restrict, async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.destroy({
      where: {
        id
      }
    });
    res.json({ venue });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = venueRouter;
