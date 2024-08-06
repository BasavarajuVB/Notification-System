const express = require('express');
const cors = require('cors');
const notificationEventsRouter = require('./routes/notificationEvents');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notification-events', notificationEventsRouter);

module.exports = app;