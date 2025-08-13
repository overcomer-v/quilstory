import { useEffect } from "react";
import {
  useJournalDatabaseManager,
  useNoteDatabaseManager,
} from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { HorizontalJournalCard } from "../components/JournalCard";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { events, isJournalLoading, loadEvents } = useJournalDatabaseManager();
  const { notes, notesError, loadNotes, isNotesLoading } =
    useNoteDatabaseManager();
  const { loading, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      loadEvents(currentUser.uid);
      loadNotes(currentUser.uid);
    }
    if (!loading && !currentUser) {
      navigate("/");
    }
    console.log(loading, currentUser);
  }, [currentUser]);

  useEffect(() => {}, []);

  return loading ? (
    <Spinner isDark={false} className={"w-24 h-24"}></Spinner>
  ) : (
    <div className="page-animate">
      <GreetingsAndDate name={currentUser?.displayName}></GreetingsAndDate>
      <div className="mt-6 md:mt-12 flex flex-col gap-3">
        <div className="flex md:gap-2 gap-2">
          <QuickAccessItems
            iconData={"fa-pen"}
            title={"Write Journal"}
            onClick={() => {
              navigate("/editor/journals");
            }}
          ></QuickAccessItems>
          <QuickAccessItems
            iconData={"fa-pencil"}
            title={"Add Note"}
            onClick={() => {
              navigate("/editor/notes");
            }}
          ></QuickAccessItems>
          <div className="md:flex hidden">
            <QuickAccessItems
              iconData={"fa-camera"}
              title={"Add Media"}
            ></QuickAccessItems>
          </div>
        </div>

        <section id="recent-journals" className="md:mt-12 mt-6">
         <Subtitle label={"Recent Journals"}></Subtitle>
          <div className="grid md:grid-cols-2 gap-4">
            {isJournalLoading ? (
              <Spinner isDark={true} className={"h-24 w-24 m-auto opacity-30"}></Spinner>
            ) : (
              events
                ?.slice(0, 5)
                .map((e) => (
                  <HorizontalJournalCard
                    title={e.title}
                    date={e.date}
                    prev={e.journalEvent}
                  ></HorizontalJournalCard>
                ))
            )}
          </div>
        </section>

        <section id="recent-Notes" className="mt-12">
        <Subtitle label={"Recent Notes"}></Subtitle>
          <div className="grid md:grid-cols-2 gap-3">
            {isNotesLoading ? (
              <Spinner isDark={true} className={"h-24 w-24 opacity-30 m-auto"}></Spinner>
            ) : (
              notes
                ?.slice(0, 5)
                .map((e) => (
                  <HorizontalJournalCard
                    title={e.title}
                    date={e.date}
                    prev={e.note}
                  ></HorizontalJournalCard>
                ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function GreetingsAndDate({ name }) {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(Date.now());

  function getDateType(date) {
    switch (date) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-xs opacity-60 mb-1">WELCOME</h3>
        <h1 className="text-2xl md:text-3xl">{name}</h1>
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

function Subtitle({ label }) {
 return <div className="flex gap-2 items-center mb-4">
    <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
    <h1 className="md:text-xl text-lg font-bold opacity-90 ">
      {label}
    </h1>
  </div>;
}

function QuickAccessItems({ iconData, title, onClick, edit }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-40 md:w-40 h-32 rounded-lg flex flex-col bg-neutral-100 justify-between relative items-start gap-3 px-6 py-4 shadow-md`}
      >
        <i
          className={`fa ${iconData} bg-blue-600 p-2 w-fit rounded-lg bg-opacity-10 text-blue-600`}
        ></i>
        <p className="text-sm opacity-70">{title}</p>
      </button>
    </div>
  );
}
