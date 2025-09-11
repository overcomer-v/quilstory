import { useJournalDatabaseManager } from "../hooks/dbManager";
import { ItemCard } from "../components/ItemsCard";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useEffect, useRef, useState } from "react";
import { useInternetStatus } from "../hooks/internetStatus";
import { ErrorMessage, OfflineMessage } from "../components/ErrorWidget";
import { useNavigate } from "react-router-dom";

export function AllJournalLists() {
  const {
    events,
    isJournalLoading,
    loadEvents,
    deleteItem,
  } = useJournalDatabaseManager();
  const { loading, currentUser } = useAuth();
  const navigate = useNavigate();
  const pageRef = useRef();
  const [journalError,setJournalError] = useState();

  useEffect(() => {
   async function loadJournals() {
     if (currentUser) {
      try {
        await loadEvents(currentUser.id);
      } catch (error) {
        setJournalError(error);
      }
    }
   }

   loadJournals();


  }, [currentUser, loading]);

  // !isOnline ? (
  //     <OfflineMessage></OfflineMessage>
  //   ) :

  async function onActions(action, id, imagePath) {
    if (action === "Delete") {
      await deleteItem(currentUser.id, id, imagePath);
    } else if (action === "Edit") {
      navigate(`/journal-editor/${id}`);
      console.log("Go to edit page");
    }
  }

  return isJournalLoading || loading ? (
    <div className="flex items-center justify-center w-full h-[60vh]">
      <Spinner
        className={"h-16 w-16 text-black opacity-70"}
        isDark={true}
      ></Spinner>
    </div>
  ) : journalError ? (
    <ErrorMessage message={journalError}></ErrorMessage>
  ) : !events.length > 0 ? (
    <ErrorMessage message={"Your Events are empty"}></ErrorMessage>
  ) : (
    <div
      ref={pageRef}
      className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-1 md:gap-8 gap-3 justify-start items-start page-animate"
    >
      {events.map((e) => {
        // console.log(e)
        return (
          <ItemCard
            key={e.id}
            ref={pageRef}
            item={e}
            onAction={onActions}
            onClick={() => {
              navigate(`/item-view/journal/${e.id}`);
            }}
          ></ItemCard>
        );
      })}
    </div>
  );
}
