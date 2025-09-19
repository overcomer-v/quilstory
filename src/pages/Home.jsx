import { useEffect } from "react";
import {
  useJournalDatabaseManager,
  useNoteDatabaseManager,
} from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { HorizontalItemCard } from "../components/ItemsCard";
import { getDateType, monthArray } from "../utils/date-formatter";
import { WelcomeGreetings } from "../components/GreetingsComp";

export function Home() {
  const { events, isJournalLoading, loadEvents } = useJournalDatabaseManager();
  const { notes, loadNotes, isNotesLoading } = useNoteDatabaseManager();
  const { loading, currentUser, userName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      loadEvents(currentUser.id);
      loadNotes(currentUser.id);
    }
    if (!loading && !currentUser) {
      navigate("/");
    }
    console.log(loading, currentUser);
  }, [currentUser]);

  useEffect(() => {}, []);

  return loading ? (
    <Spinner isDark={false} className={"text-4xl"}></Spinner>
  ) : (
    <div className="page-animate">
      <WelcomeGreetings message={"WELCOME"}/>

      <div className="mt-8 md:mt-12 flex flex-col gap-3">
        <Link
          to={"/editor/journals"}
          className=" flex gap-2 font-light text-sm items-center w-[90%] shadow-bg shadow-md md:w-[350px] rounded-2xl px-5 py-4 "
        >
          <i
            className={`fa fa-pen z-10 bg-blue-600 p-1 w-fit rounded-lg bg-opacity-10 text-xs text-blue-600`}
          ></i>
          <p className="opacity-30">Whats on your mind</p>
        </Link>

        <div className="flex md:gap-2 gap-2 mb-4">
          <QuickAccessItems
            iconData={"fa-pencil"}
            title={"Add Note"}
            onClick={() => {
              navigate("/editor/notes");
            }}
          ></QuickAccessItems>

          <QuickAccessItems
            iconData={"fa-camera"}
            title={"Add Media"}
          ></QuickAccessItems>
        </div>
        <div>
          <RecentJournalPreview />
          <RecentNotesPreview />
        </div>
      </div>
    </div>
  );

  function RecentJournalPreview() {
    return (
      <section id="recent-journals" className="md:mt-12 mt-6">
        <Subtitle label={"Recent Journals"}></Subtitle>
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(400px,500px))] gap-4">
          {isJournalLoading ? (
            <Spinner
              isDark={true}
              className={"text-2xl m-auto opacity-30"}
            ></Spinner>
          ) : (
            events?.slice(0, 5).map((e,i) => (
              <HorizontalItemCard
              key={i}
                title={e.title}
                date={e.created_at}
                prev={e.event}
                imgSrc={e.imageSrc}
                onClick={() => {
                  navigate(`/item-view/journal/${e.id}`);
                }}
              ></HorizontalItemCard>
            ))
          )}
        </div>
      </section>
    );
  }

  function RecentNotesPreview() {
    return (
      <section id="recent-Notes" className="mt-12">
        <Subtitle label={"Recent Notes"}></Subtitle>
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(400px,500px))] gap-3">
          {isNotesLoading ? (
            <Spinner
              isDark={true}
              className={"text-2xl opacity-30 m-auto"}
            ></Spinner>
          ) : (
            notes?.slice(0, 5).map((e,i) => (
              <HorizontalItemCard
              key={i}
                title={e.title}
                date={e.created_at}
                prev={e.note}
                onClick={() => {
                  navigate(`/item-view/note/${e.id}`);
                }}
              ></HorizontalItemCard>
            ))
          )}
        </div>
      </section>
    );
  }
}


function Subtitle({ label }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <div className="w-4 h-4 bg-blue-700 rounded-full opacity-70"></div>
      <h1 className="md:text-xl text-lg font-bold opacity-90 ">{label}</h1>
    </div>
  );
}

function QuickAccessItems({ iconData, title, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={` overflow-hidden rounded-xl flex shadow-bg relative items-center gap-2 px-3 py-2 shadow-md`}
      >
        {/* <i className="fa fa-pen left-[6rem] opacity-5 top-[2rem] text-3xl absolute"></i> */}
        {/* <i className="fa fa-circle absolute -right-3 -top-0 text-4xl text-[rgb(230,230,230)] ">
          {" "}
        </i>
        <i className="fa fa-circle absolute -right-2 top-3 text-5xl text-[rgb(230,230,230)] ">
          {" "}
        </i> */}

        <i
          className={`fa ${iconData} z-10 bg-blue-600 p-1 w-fit rounded-lg bg-opacity-10 text-xs text-blue-600`}
        ></i>

        <p className="text-xs opacity-70">{title}</p>
      </button>
    </div>
  );
}
