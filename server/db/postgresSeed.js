// Seeding script for reservations component using PostgreSQL
// Keyspace on PostgreSQL: devopsi_reservations
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

const writer = csvWriter();
const writerRes = csvWriter();

const {
  printProgress,
  dateRandomGenerator,
  getRoundedDate,
} = require('./utils/helpers.js');

// let businessData = {
//   id: 0,
//   open_time: 0,
//   close_time: 0,
//   res_length: 0,
//   max_party_size: 0,
//   num_of_seats: 0,
// };

let resData = [];

const busGen = () => {
  let totalRecords = 1000000;
  let decrementer = 1000000;
  writer.pipe(fs.createWriteStream('postgresBusiness.csv'));
  writerRes.pipe(fs.createWriteStream('postgresReservations.csv'));
  writeBusinesses(totalRecords, decrementer);
}

const writeBusinesses = (totalRecords, decrementer) => {
  let isBusinessFlowing = true;

    if(decrementer % 20000 === 0) {
      printProgress(decrementer);
    }

    decrementer--;

    for(let i = 0; i < totalRecords; i++) {
      const businessData = generateBusinessData(decrementer);
      const reservationData = generateReservationData(businessData);
  
        writer.write(businessData);
        // writeReservations(reservationData);

        if(i % 10000 === 0) {
          console.log(`\n${i} records have been recorded to the csv`);
        }

    }



    // do {
    //   if(decrementer % 20000 === 0) {
    //     printProgress(decrementer);
    //   }

    //   decrementer--;
  
    //   const businessData = generateBusinessData(decrementer);
    //   const reservationData = generateReservationData(businessData);
  
    //   if(decrementer === 0) {
    //     writer.write(businessData);
    //     writeReservations(reservationData);
    //     printProgress(decrementer);
    //     console.log(`\n${totalRecords} records have been recorded to the csv`);
    //   } else {
    //     writeReservations(reservationData);
    //     isBusinessFlowing = writer.write(businessData);
    //   }
    // } while(decrementer > 0 && isBusinessFlowing);
  
    // if(decrementer > 0) {
    //   writer.once('drain', writeBusinesses.bind(null, totalRecords, decrementer));
    // }
}

const generateBusinessData = (id) => {
  let open_time = [9, 10, 11];
  let close_time = [21, 22, 23];
  let res_length = [1, 2];
  let max_party_size = [6, 8, 10, 12];
  let num_of_seats = [20, 30, 40, 50, 60, 70, 80, 90, 100];

  let open_time_instance = open_time[Math.floor(Math.random() * open_time.length)];
  let close_time_instance = close_time[Math.floor(Math.random() * close_time.length)];
  let res_length_instance = res_length[Math.floor(Math.random() * res_length.length)];
  let max_party_size_instance = max_party_size[Math.floor(Math.random() * max_party_size.length)];
  let num_of_seats_instance = num_of_seats[Math.floor(Math.random() * num_of_seats.length)];
  let businessData = {
    id: id,
    open_time: open_time_instance,
    close_time: close_time_instance,
    res_length: res_length_instance,
    max_party_size: max_party_size_instance,
    num_of_seats: num_of_seats_instance,
  };

  return businessData;
};

const generateReservationData = (businessData) => {

  const {
    id,
    open_time,
    close_time,
    num_of_seats,
    max_party_size,
  } = businessData;
  let randomReservationNumber = Math.ceil(Math.random() * 60);
  let runningReservations = [];

  for(let j = 0; j < randomReservationNumber; j++) {
    let reservation_time = getRoundedDate(15, dateRandomGenerator(30, open_time, close_time - open_time));
    reservation_time = reservation_time.getTime();
    let party_qty = Math.floor(Math.random() * 8);

    let totalNumOfPeople = 0;

    for(let i = 0; i < runningReservations.length; i++) {
      if(reservation_time >= runningReservations[i][2]) {
        totalNumOfPeople += runningReservations[i][1];
      }
    }
  
    if(totalNumOfPeople + party_qty <= num_of_seats) {
      isAvailable = true;
    }

    if(true) {
      runningReservations.push([num_of_seats, party_qty, reservation_time]);
      resData.push({
        id: id,
        res_id: uuidv4(),
        user_id: faker.internet.userName(),
        reservation_time: reservation_time,
        party_qty: max_party_size[Math.floor(Math.random() * max_party_size.length)],
      });
    }
  }

  return resData;
}

const writeReservations = (resData) => {
  let decrementer = resData.length;
  
  write();

  function write() {
    let isResFlowing = true;
    do {
      decrementer--;
  
      if(decrementer === 0) {
        writerRes.write(resData[decrementer]);
      } else {
        isResFlowing = writerRes.write(resData[decrementer]);
      }
    } while(decrementer && isResFlowing)
  }
  if(decrementer > 0) {
    writerRes.once('drain', write);
  }
}

busGen();