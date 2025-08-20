import { useEffect, useRef, useState } from "react";
import JournalEvent from "../models/Event";
import { useJournalDatabaseManager } from "../hooks/dbManager";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

export function JournalEditor() {
  const selectFileRef = useRef(null);
  const { uploadEvent } = useJournalDatabaseManager();
  const { currentUser, loading } = useAuth();
  const { journalId } = useParams();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [events, setEvent] = useState("");
  const [imageSrc, setImages] = useState();
  const [imageFile,setImageFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const { getItem, updateItem } = useJournalDatabaseManager();

  useEffect(() => {
    if (journalId) {
      getItem(currentUser.uid, journalId).then((result) => {
        setTitle(result.title);
        setEvent(result.journalEvent);
        setTags(result.tags);
        setImages(result.imageSrc);
        console.log(result);
      });
    }
  }, []);

  function getImageSrc() {
   if (imageSrc) {
     if (journalId && imageFile) {
      return URL.createObjectURL(imageSrc);
    }else if(journalId && !imageFile){
      return imageSrc;
    }else{
      return URL.createObjectURL(imageSrc);
    }
   }
  }

  async function uploadEventsHandler() {
  if(title && events) { const formatter = new Date(Date.now());

    const event = {
      title: title,
      date: formatter.toLocaleString(),
      journalEvent: events,
      ...(tags ? {tags: tags}:{}),
    };

    try {
      setIsUploading(true);
      if (journalId) {
        if (imageFile) {
          await updateItem(currentUser.uid,journalId, event,imageSrc,imageFile);
      }else{
        await updateItem(currentUser.uid,journalId,event)
      }
      } else {
        await uploadEvent(event, imageFile, currentUser.uid);
      }
      console.log(event);
      navigate("/entries");
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }}else{
      alert("Title and Event cannot be empty")
    }
  }

  return loading ? (
    <div className="flex items-center justify-center w-full h-screen page-animate">
      <Spinner
        className={"h-16 w-16 text-black opacity-70 m-auto"}
        isDark={true}
      ></Spinner>
    </div>
  ) : (
    <div className="">
      <form className="flex flex-col font-light page-animate gap-3 md:gap-6 [&_input]:border-[1px] [&_input]:border-neutral-300">
        <input
          className="px-4 py-3 rounded-lg w-[80%] md:w-[60%] text-sm max-w-[700px]"
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
          className="border-[1px] border-neutral-300 p-4 rounded-lg text-sm w-[90%] max-w-[900px]"
          name="journal-i"
          id="notes-i"
          placeholder="Event"
          value={events}
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        ></textarea>

        <input
          className="px-4 py-3 rounded-lg w-[80%] md:w-[60%] text-sm max-w-[700px]"
          type="text"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
          id="tags"
          placeholder="Tags like location, people, music, objects, pets ete"
        />

        {imageSrc && (
          <img
            className="h-28 w-28 object-cover rounded-xl"
            src={getImageSrc()}
            alt=""
          />
        )}
        <input
          className="hidden"
          type="file"
          onChange={(e) => {
            e.preventDefault();
            setImageFile(e.target.files[0]);
            setImages(e.target.files[0]);
            setTimeout(() => {
              console.log(imageFile,imageSrc);
            }, 1000);
          }}
          ref={selectFileRef}
        />
        <div className="flex md:gap-4 justify-between md:flex-row w-full md:justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              selectFileRef.current.click();
            }}
            className="items-center gap-4 flex justify-center text-sm shadow-md shadow-bg rounded-lg md:w-fit px-4 py-2 text-blue-600"
          >
            <i className="fa fa-image text-2xl"></i>
            <h2>Add picture</h2>
          </button>

          <button
            type="button"
            onClick={() => {
              uploadEventsHandler();
            }}
            className="flex items-center gap-4 border-2 text-sm justify-center bg-blue-600 rounded-lg md:w-fit px-4 py-2 text-white"
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
