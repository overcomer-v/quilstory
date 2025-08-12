import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNoteDatabaseManager } from "../hooks/dbManager";
import { createNoteObject } from "../models/Notes";
import { Spinner } from "../components/Spinner";

export function NotesEditor() {
  const { uploadNotes } = useNoteDatabaseManager();
  const { currentUser, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  async function uploadNotesHandler() {
    const formatter = new Date(Date.now());

    const notee = createNoteObject({ title, date: formatter.toLocaleString(), note });
    try {
      setIsUploading(true);
      await uploadNotes(notee, currentUser.uid);
      console.log(notee);
      navigate("/entries");
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  }

  return loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner
        className={"h-24 w-24 text-black opacity-70"}
        isDark={true}
      ></Spinner>
    </div>
  ) : (
    <div className="">
      <form className="flex flex-col page-animate font-light gap-12 [&_input]:border-2 [&_input]:border-neutral-300">
        <input
          className="px-4 py-3 rounded-xl md:w-[60%]"
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea
          rows={12}
          className="border-2 border-neutral-300 p-4 rounded-xl"
          name="journal-i"
          id="notes-i"
          placeholder="Event"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        ></textarea>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              uploadNotesHandler();
            }}
            className="flex items-center gap-4 border-2 bg-blue-500 rounded-lg w-fit px-6 py-3 text-white"
          >
            {isUploading ? (
              <Spinner isDark={false} className={"h-6 w-6"}></Spinner>
            ) : (
              <i className="fa fa-check text-2xl"></i>
            )}
            <h2>Save Journal</h2>
          </button>
        </div>
      </form>
    </div>
  );
}
