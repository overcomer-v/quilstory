import { useRef, useState } from "react";
import JournalEvent from "../models/Event";
import { useJournalDatabaseManager } from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export function JournalEditor() {
  const selectFileRef = useRef(null);
  const { uploadEvent } = useJournalDatabaseManager();
  const { currentUser, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState();
  const [events, setEvent] = useState();
  const [image, setImages] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  async function uploadEventsHandler() {
    const formatter = new Date(Date.now());

    const event = new JournalEvent({
      title: title,
      date: formatter.toLocaleString(),
      journalEvent: events,
      tags: tags,
    });
    try {
      setIsUploading(true);
      await uploadEvent(event.toObject(), image, currentUser.uid);
      console.log(event);
      navigate("/entries");
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  }

  return loading ? (
    <div className="flex items-center justify-center w-full h-screen page-animate">
      <Spinner
        className={"h-24 w-24 text-black opacity-70"}
        isDark={true}
      ></Spinner>
    </div>
  ) : (
    <div className="">
      <form className="flex flex-col font-light page-animate gap-6 md:gap-12 [&_input]:border-2 [&_input]:border-neutral-300">
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
          value={events}
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        ></textarea>

        <input
          className="px-4 py-3 rounded-xl md:w-[60%]"
          type="text"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
          id="tags"
          placeholder="Tags like location, people, music, objects, pets ete"
        />

        <input
          className="hidden"
          type="file"
          onChange={(e) => {
            e.preventDefault();
            setImages(e.target.files[0]);
          }}
          ref={selectFileRef}
        />
        <div className="flex gap-4 md:flex-row flex-col w-full justify-end">
          <button
            onClick={() => {
              selectFileRef.current.click();
            }}
            className="items-center gap-4 border-2 flex justify-center border-blue-500 rounded-lg md:w-fit px-6 py-3 text-blue-500"
          >
            <i className="fa fa-image text-2xl"></i>
            <h2>Add picture</h2>
          </button>

          <button
            type="button"
            onClick={() => {
              uploadEventsHandler();
            }}
            className="flex items-center gap-4 border-2 justify-center bg-blue-500 rounded-lg md:w-fit px-6 py-3 text-white"
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
