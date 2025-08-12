import {
  useNoteDatabaseManager,
} from "../hooks/dbManager";
import { JournalCard } from "../components/JournalCard";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useEffect } from "react";
import { useInternetStatus } from "../hooks/internetStatus";
import { ErrorMessage, OfflineMessage } from "../components/ErrorWidget";

export function AllNotesLists() {
  const {notes,notesError,loadNotes,isNotesLoading} = useNoteDatabaseManager();
  const isOnline = useInternetStatus();
  const { loading, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadNotes(currentUser.uid);
      
    }
  }, [currentUser, loading]);

  return !isOnline ? (
    <OfflineMessage></OfflineMessage>
  ) : isNotesLoading || loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner
        className={"h-24 w-24 text-black opacity-70"}
        isDark={true}
      ></Spinner>
    </div>
  ) : notesError ? (
    <ErrorMessage message={notesError}></ErrorMessage>
  ) : !notes.length > 0 ? (
    <ErrorMessage message={"Your Events are empty"}></ErrorMessage>
  ) : (
    <div className="grid md:grid-cols-3 gap-6 justify-start items-start page-animate">
     
      {notes.map((e) => (
        <JournalCard
          title={e.title}
          prev={e.note}
          date={e.date}
        ></JournalCard>
      ))}
    </div>
  );
}
