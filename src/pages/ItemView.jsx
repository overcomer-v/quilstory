import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  useJournalDatabaseManager,
  useNoteDatabaseManager,
} from "../hooks/dbManager";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "postcss";
import { Spinner } from "../components/Spinner";

export function ItemView() {
  const { currentUser } = useAuth();
  const { getItem, deleteItem } = useJournalDatabaseManager();
  const { getNoteItem, deleteNoteItem } = useNoteDatabaseManager();
  const { type, itemId } = useParams();
  const [item, setItem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "journal") {
      getItem(currentUser.uid, itemId).then((result) => {
        setItem(result);
        console.log(result);
      });
    } else {
      getNoteItem(currentUser.uid, itemId).then((result) => {
        setItem(result);
      });
    }
  }, []);

  return !item ? (
    <div className=" flex flex-col h-[60vh]">
      <Spinner
        isDark={true}
        className={"h-12 w-12 m-auto opacity-30"}
      ></Spinner>
    </div>
  ) : (
    <div className="mt-8">
      <div className="flex gap-4">
        <Button
          text={"Edit"}
          iconData={"fa-pen"}
          onClick={() => {
            navigate(
              type === "journal"
                ? `/journal-editor/${itemId}`
                : `/note-editor/${item}`
            );
          }}
        ></Button>
        <Button
          text={"Delete"}
          iconData={"fa-trash"}
          onClick={async () => {
            if (type === "journal") {
              await deleteItem(currentUser.id, itemId, item.image_url);
              navigate("/entries");
            } else {
              await deleteNoteItem(currentUser.id, itemId);
            }
          }}
        ></Button>
        <Button text={"Share"} iconData={"fa-share"}></Button>
      </div>
      <div className="flex flex-col items-start gap-4 md:w-[500px] w-full mt-8 md:mt-16">
        <div className="mb-2 md:mb-4">
          <h2 className="text-3xl">{item.title}</h2>
          <p className="text-xs opacity-40">{item.date}</p>
        </div>
      </div>
      <div className="mt gap-2">
        {item.event && (
          <img
            className="rounded-lg h-[300px] object-cover float-left mr-4 mb-8"
            src={item.imageSrc ?? "/images/pexels-photo-1018133.jpeg"}
            alt=""
          />
        )}
        <p className="font-light text-base opacity-90 md:w-[80%] w-full mt-4">
          {item.event ?? item.note}
        </p >
        {item.event && <p className="mt-3 border-[1px] border-neutral-400 w-fit px-3 py-2 rounded-xl">{` ${item.tag}`}</p>}
      </div>
    </div>
  );

  function Button({ text, iconData, onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 flex gap-2 items-center shadow-sm rounded-md"
      >
        <i className={`fa ${iconData} opacity-50 text-xs`}></i>
        <p className="text-xs opacity-80">{text}</p>
      </button>
    );
  }
}
