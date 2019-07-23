const express = require('express');
const path = require('path');

const app = express();
const port = 3001;
const db = require('./db/index');

app.use('/:restaurantId' ,express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/reservation/:restaurantId', (req, res) => {
  const { timestamp } = req.query; // get query parameters
  const { restaurantId } = req.params;
  const sqlQuery = `
    SELECT
      *
    FROM
      reservation
    WHERE
      restaurant_id = ${restaurantId}
      AND timestamp = ${timestamp}
  `;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
