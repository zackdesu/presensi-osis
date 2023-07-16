const day = new Date().getDate();
const month = new Date().getMonth();

const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const dateNow = day + " " + monthName[month];

export default dateNow;
