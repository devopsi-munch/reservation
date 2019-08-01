// Seed helper library for munch
// Lee Graham

const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress + ' records left to create');
}

const dateRandomGenerator = (rangeOfDays, startHour, hourRange) => {
  var today = new Date(Date.now());
  return new Date(
    today.getYear() + 1900, today.getMonth(),
    today.getDate()+Math.random() * rangeOfDays,
    Math.random() * hourRange + startHour,
    Math.random() * 60)
  }
  
const getRoundedDate = (minutes, d=new Date()) => {
let ms = 1000 * 60 * minutes;
let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

return roundedDate.getTime();
}

module.exports = {
  printProgress,
  dateRandomGenerator,
  getRoundedDate,
}