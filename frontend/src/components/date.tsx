export const day = new Date().getDate();
export const monthNum = new Date().getMonth();
export const dayOnWeek = new Date().getDay();
const year = new Date().getFullYear();

export const dayName: string[] = [
  "Sen",
  "Sel",
  "Rab",
  "Kam",
  "Jum",
  "Sab",
  "Min",
];
export const monthName: string[] = [
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

export const month = monthName[monthNum];

export const toDayName = dayName[dayOnWeek - 1];

export const jumpDate = new Date(year, monthNum, 1).getDay();

export const dateNow = day + " " + month;

export const spacingDate = Array(jumpDate - 1)
  .fill("")
  .map((_, i) => <span key={i} />);
