import { useJournalDatabaseManager } from "../hooks/dbManager";
import { JournalCard } from "../components/JournalCard";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { useInternetStatus } from "../hooks/internetStatus";
import { ErrorMessage, OfflineMessage } from "../components/ErrorWidget";

export function AllJournalLists() {
  const { events, isJournalLoading, loadEvents, journalError, getImageUrl } =
    useJournalDatabaseManager();
  const isOnline = useInternetStatus();
  const { loading, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadEvents(currentUser.uid);
    }
  }, [currentUser, loading]);

  return !isOnline ? (
    <OfflineMessage></OfflineMessage>
  ) : isJournalLoading || loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner
        className={"h-24 w-24 text-black opacity-70"}
        isDark={true}
      ></Spinner>
    </div>
  ) : journalError ? (
    <ErrorMessage message={journalError}></ErrorMessage>
  ) : !events.length > 0 ? (
    <ErrorMessage message={"Your Events are empty"}></ErrorMessage>
  ) : (
    <div className="grid :grid-cols-2 md:grid-cols-2 md:gap-6 gap-3 justify-start items-start page-animate">
      {events.map((e) => {
        return (
         <JournalPageCard
           title={e.title}
            prev={e.journalEvent}
            date={e.date}
            imagePath={e?.imageUrl}>
         </JournalPageCard>
        );
      })}
    </div>
  );
} 

export function JournalPageCard({ imagePath, title, prev, date }) {
  const { getImageUrl } = useJournalDatabaseManager();

  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    getImageUrl(imagePath).then((url) => {
      console.log(url);
      setImageUrl(url);
    });
  }, []);

  return <JournalCard
    title={title}
    prev={prev}
    date={date}
    imgSrc={imageUrl}
  ></JournalCard>;
}
