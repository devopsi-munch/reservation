const moment = require('moment');
const db = require('./index');

const createSeed = (numOfDays) => {
  const seedArr = [];
  const num_of_seat = 30;
  const curDateUnix = Math.floor(moment().unix() / 86400) * 86400;
  for (let i = 0; i < 100; i++) { // generate 100 restaurants
    const restaurant_id = i + 1;
    for (let j = 0; j < numOfDays; j++) { // generate timestamp for each day
      const startTimeStamp = curDateUnix + 86400 * j;
      for (let k = 0; k < 3; k++) { // Three time slots: 6pm 7pm 8pm
        const timestamp = startTimeStamp + 64800 + k * 3600;
        const row = [restaurant_id, timestamp, num_of_seat];
        seedArr.push(row);
      }
    }
  }
  return seedArr;
};

const insertSeedIntoTable = () => {
  const seed = createSeed(90);
  const insertQuery = 'INSERT INTO reservation (restaurant_id, timestamp, num_of_seat) VALUES ?';
  db.query(insertQuery, [seed], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Data successfully inserted');
    }
    process.exit();
  });
};

insertSeedIntoTable();
