import { useState } from "react";
import { JournalEditor } from "./JournalEditor";
import { NotesEditor } from "./NotesEditor";
import { useParams } from "react-router-dom";

export function Editor() {
  const {entryType} = useParams();
  const [type, setType] = useState(entryType ? entryType:"journals");

  return (
    <div className="">
      <div className="flex gap-3 md:mb-10 mb-4 items-center">
        <SelectorButton
          idType={"journals"}
          text={"Journals"}
          onClick={() => {
            setType("journals");
          }}
        ></SelectorButton>
        <SelectorButton
          idType={"notes"}
          text={"Notes"}
          onClick={() => {
            setType("notes");
          }}
        ></SelectorButton>
      </div>
      {type === "journals" ? (
        <JournalEditor></JournalEditor>
      ) : type === "notes" ? (
        <NotesEditor></NotesEditor>
      ) : (
        ""
      )}
    </div>
  );

  function SelectorButton({ idType, text, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`md:px-5 md:h-10 px-5 h-10 text-sm ${
          type === idType ? "bg-blue-600 text-white" : "shadow-bg text-neutral-600"
        } rounded-2xl shadow-md`}
      >
        {text}
      </button>
    );
  }
}
