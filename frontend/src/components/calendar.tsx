import { dayName, toDayName, spacingDate, day, month } from "./date";

const oneMonthDate: string[] = [];

for (let i = 1; i < 32; i++) {
  oneMonthDate.push(i.toString());
}

const Calendar = () => (
  <>
    <h4>Kalender</h4>
    <h6 className="mb-2">{month}</h6>
    <div className="w-full grid grid-cols-7 place-items-center">
      {dayName.map((m, i) => (
        <span
          className={`p-2 text-[.7rem] rounded-full ${
            m === toDayName && "bg-orange-500"
          }`}
          key={i}
        >
          {m}
        </span>
      ))}
    </div>
    <div className="w-full h-full grid grid-rows-6 grid-cols-7 place-items-center">
      {spacingDate}
      {oneMonthDate.map((d, i) => (
        <span
          className={`rounded-full text-[.7rem] flex items-center justify-center w-[20px] h-[20px] p-3 ${
            d === day.toString() && "bg-orange-500"
          }`}
          key={i}
        >
          {d}{" "}
        </span>
      ))}
    </div>
  </>
);

export default Calendar;
