import { useAuth } from "../contexts/AuthContext";
import { getDateType, monthArray } from "../utils/date-formatter";

export function Greetings() {
  const date = new Date();
  const { userName } = useAuth();

  function greeting() {
    if (date.getHours() < 12) {
      return "GoodMorning";
    } else if (date.getHours() > 11 && date.getHours() < 16) {
      return "GoodAfternoon";
    } else if (date.getHours() >= 16) {
      return "GoodEvening";
    } else {
      return "Hey";
    }
  }
  return (
    <div className=" flex justify-between">
      <div>
        <h1 className="md:text-2xl text-xl">{greeting()}</h1>
        <p className="opacity-50 font-light text-sm md:text-base">{userName}</p>
      </div>
      <div className="flex gap-1 items-center font-light [&_p]:text-xs [&_p]:opacity-80  leading-none">
        <h1 className="md:text-4xl text-3xl">
          {date.getDate()}
          <span className="text-sm opacity-40">
            {getDateType(date.getDate())}
          </span>
        </h1>
        <div className="flex flex-col leading-none">
          <p>{monthArray[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}


export function WelcomeGreetings({ message }) {
  const date = new Date(Date.now());
    const { userName } = useAuth();

  return (
    <div className="flex justify-between mt-12">
      <div className="leading-none">
        <h3 className="md:text-xs text-[0.6rem] opacity-60 md:mb-1">
          {message}
        </h3>
        <h1 className="text-xl md:text-3xl">{userName}</h1>
      </div>

      <div className="flex gap-1 items-center font-light [&_p]:text-xs [&_p]:opacity-80  leading-none">
        <h1 className="md:text-4xl text-3xl">
          {date.getDate()}
          <span className="text-sm opacity-40">
            {getDateType(date.getDate())}
          </span>
        </h1>
        <div className="flex flex-col leading-none">
          <p>{monthArray[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
