import { useNoteDatabaseManager } from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useEffect, useRef, useState } from "react";
import { useInternetStatus } from "../hooks/internetStatus";
import { ErrorMessage, OfflineMessage } from "../components/ErrorWidget";
import { ItemCard } from "../components/ItemsCard";
import { useNavigate } from "react-router-dom";

export function AllNotesLists() {
  const { notes, loadNotes, isNotesLoading, deleteNoteItem } =
    useNoteDatabaseManager();
  const isOnline = useInternetStatus();
  const { loading, currentUser } = useAuth();
  const [notesError, setNotesError] = useState();
  const navigate = useNavigate();
  const itemsRef = useRef();

  useEffect(() => {
    async function loadNotess() {
      if (currentUser) {
        try {
          await loadNotes(currentUser.id);
        } catch (error) {
          setNotesError(error);
        }
      }
    }

    loadNotess();
  }, [currentUser, loading]);

  async function onActions(action, id) {
    if (action === "Delete") {
      await deleteNoteItem(currentUser.id, id);
      console.log(id);
    } else if (action === "Edit") {
      navigate(`/note-editor/${id}`);
      console.log("Go to edit page");
    }
  }

  return !isOnline ? (
    <OfflineMessage></OfflineMessage>
  ) : isNotesLoading || loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner
        className={"h-16 w-16 text-black opacity-40"}
        isDark={true}
      ></Spinner>
    </div>
  ) : notesError ? (
    <ErrorMessage message={notesError}></ErrorMessage>
  ) : !notes.length > 0 ? (
    <ErrorMessage message={"Your Events are empty"}></ErrorMessage>
  ) : (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,300px))] gap-6 justify-start items-start page-animate">
      {notes.map((e) => (
        <ItemCard
         
          key={e.id}
          onAction={onActions}
          item={e}
          onClick={() => {
            navigate(`/item-view/note/${e.id}`);
          }}
        ></ItemCard>
      ))}
    </div>
  );
}
