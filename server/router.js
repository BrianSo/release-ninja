const { Router } = require('express');

const app = Router();

app.use('/api', (req, res) => {
  res.json("online");
});

module.exports = app;
