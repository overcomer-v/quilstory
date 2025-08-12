import { useState } from "react";
import { JournalEditor } from "./JournalEditor";
import { NotesEditor } from "./NotesEditor";
import { useParams } from "react-router-dom";

export function Editor() {
  const {entryType} = useParams();
  const [type, setType] = useState(entryType ? entryType:"journals");

  return (
    <div>
      <div className="flex gap-3 mb-10 items-center">
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
        className={`px-4 h-10 ${
          type === idType ? "bg-blue-600 text-white" : "border-[1px] border-neutral-300 text-neutral-600"
        } rounded-xl`}
      >
        {text}
      </button>
    );
  }
}
