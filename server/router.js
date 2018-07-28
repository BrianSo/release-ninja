const { Router } = require('express');

const app = Router();
app.get('/', (req, res) => {
  res.json("online");
});

app.use('/api', (req, res) => {
  res.json("online");
});

module.exports = app;
