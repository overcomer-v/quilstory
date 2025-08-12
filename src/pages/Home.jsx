import { useEffect } from "react";
import { useJournalDatabaseManager, useNoteDatabaseManager } from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { HorizontalJournalCard } from "../components/JournalCard";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { events, isJournalLoading, loadEvents } = useJournalDatabaseManager();
    const {notes,notesError,loadNotes,isNotesLoading} = useNoteDatabaseManager();
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
  console.log(loading,currentUser);
  }, [currentUser]);

  useEffect(() => {
 
  }, []);

  return loading ? (
    <Spinner isDark={false} className={"w-24 h-24"}></Spinner>
  ) : (
    <div className="page-animate">
      <GreetingsAndDate name={currentUser?.displayName}></GreetingsAndDate>
      <div className="mt-12 flex flex-col gap-3">
        <div className="flex md:gap-5 gap-1">
          <QuickAccessItems
            iconData={"fa-pen"}
            title={"Add Journal"}
            onClick={()=>{navigate("/editor/journals")}}
          ></QuickAccessItems>
          <QuickAccessItems
            iconData={"fa-pencil"}
            title={"Add Note"}
            onClick={()=>{navigate("/editor/notes")}}
          ></QuickAccessItems>
          <QuickAccessItems
            iconData={"fa-camera"}
            title={"Add Media"}
          ></QuickAccessItems>
        </div>

        <section id="recent-journals" className="mt-12">
          <h1 className="text-xl opacity-90 mb-4">Recent Journals</h1>
          <div className="grid md:grid-cols-2 gap-3">
            {isJournalLoading ? (
              <Spinner isDark={true} className={"h-24 w-24"}></Spinner>
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
          <h1 className="text-xl opacity-90 mb-4">Recent Notes</h1>
          <div className="grid md:grid-cols-2 gap-3">
            {isNotesLoading ? (
              <Spinner isDark={true} className={"h-24 w-24"}></Spinner>
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
 return <div className="flex justify-between">
    <div>
      <h3 className="text-xs opacity-60 mb-1">WELCOME</h3>
      <h1 className="text-3xl">{name}</h1>
    </div>

    <div className="flex gap-1 items-center font-light [&_p]:text-xs [&_p]:opacity-80  leading-none">
      <h1 className="text-4xl ">
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
  </div>;
}

function QuickAccessItems({ iconData, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-28 w-40 rounded-lg flex flex-col justify-between items-start p-4 shadow-md"
    >
      <i
        className={`fa ${iconData} bg-blue-600 p-2 w-fit rounded-lg bg-opacity-10 text-blue-600`}
      ></i>
      <p className="text-sm opacity-70">{title}</p>
    </button>
  );
}
