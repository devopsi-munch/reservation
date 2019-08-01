const fs = require('fs');
const uuidv4 = require('uuid/v4');
const faker = require('faker');
const {
  printProgress,
  dateRandomGenerator,
  getRoundedDate,
} = require('./utils/helpers.js');

const open_time = [9, 10, 11];
const close_time = [21, 22, 23];
const res_length = [1, 2];
const max_party_size = [6, 8, 10, 12];
const num_of_seats = [20, 30, 40, 50, 60, 70, 80, 90, 100];
const totalRecords = 5e6;
const businessesRemaining = 5e6;

let businessWriter = fs.createWriteStream('postgresBusiness.csv');
let reservationWriter = fs.createWriteStream('postgresReservations.csv');

let resData = [];

const writeCSVSeedFiles = () => {
  writeBusinessesAndReservations(totalRecords, businessesRemaining);
}

const writeBusinessesAndReservations = (totalRecords, businessesRemaining) => {
  let isBusinessFlowing = true;

    do {
      if(businessesRemaining % 20000 === 0) {
        printProgress(businessesRemaining);
      }

      businessesRemaining--;
   
      const businessData = generateBusinessData(businessesRemaining);
      const reservationsDataString = generateReservationData(businessData);
      if(businessesRemaining === 0) {
        businessWriter.write(businessData.businessDataString + '\n');
        writeReservations(reservationsDataString);
        printProgress(businessesRemaining);
        console.log(`\n${totalRecords} records have been recorded to the csv`);
      } else {
        isBusinessFlowing = businessWriter.write(businessData.businessDataString + '\n');
        writeReservations(reservationsDataString);
      }
    } while(businessesRemaining > 0 && isBusinessFlowing);
  
    if(businessesRemaining > 0) {
      businessWriter.once('drain', () => writeBusinessesAndReservations(totalRecords, businessesRemaining));
    }
}

const generateBusinessData = (id) => {
  const businessDataObj = {
    id: id,
    open_time: open_time[Math.floor(Math.random() * open_time.length)],
    close_time: close_time[Math.floor(Math.random() * close_time.length)],
    res_length: res_length[Math.floor(Math.random() * res_length.length)],
    max_party_size: max_party_size[Math.floor(Math.random() * max_party_size.length)],
    num_of_seats: num_of_seats[Math.floor(Math.random() * num_of_seats.length)],
  };

  const businessDataString = [
    id,
    businessDataObj.open_time,
    businessDataObj.close_time,
    businessDataObj.res_length,
    businessDataObj.max_party_size,
    businessDataObj.num_of_seats,
  ].join(',');

  return { businessDataString, businessDataObj };
};

const generateReservationData = (business) => {

  const {
    id,
    open_time,
    close_time,
    num_of_seats,
    max_party_size,
  } = business.businessDataObj;
  const numOfReservations = Math.ceil(Math.random() * 60);
  const runningReservations = [];

  for(let i = 0; i < numOfReservations; i++) {
    const reservation_time = getRoundedDate(15, dateRandomGenerator(30, open_time, close_time - open_time));
    const party_qty = Math.floor(Math.random() * 8);

    runningReservations.push([num_of_seats, party_qty, reservation_time]);

    resData.push([
      id,
      uuidv4(),
      faker.internet.userName(),
      reservation_time,
      max_party_size,
    ].join(','));
  }
  const generatedReservations = resData;
  resData = [];

  return generatedReservations;
}

const writeReservations = (reservationData) => {
  let reservationsRemaining = reservationData.length;

  for(let i = 0; i < reservationsRemaining; i++) {
    reservationWriter.write(reservationData[i] + '\n');
  }
}

writeCSVSeedFiles();