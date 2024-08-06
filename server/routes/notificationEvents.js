const express = require('express');
const router = express.Router();
const NotificationEvent = require('../models/NotificationEvent');

router.get('/', async (req, res) => {
  try {
    const { userType } = req.query;
    let query = {};
    if (userType) {
      query = { $or: [{ userType }, { userType: 'both' }] };
    }
    const events = await NotificationEvent.find(query);
    res.json(events);
  } catch (error) {
    console.error('Error fetching notification events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = new NotificationEvent(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating notification event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;