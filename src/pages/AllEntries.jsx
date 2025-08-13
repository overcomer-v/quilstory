import { useState } from "react";
import { AllJournalLists } from "./JournalsList";
import { AllNotesLists } from "./NotesList";

export function Entries({ listtype = "journals" }) {
  const [type, setType] = useState(listtype);

  return (
    <div>
      <div className="flex gap-3 items-center md:mb-8 mb-4">
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
        <AllJournalLists></AllJournalLists>
      ) : type === "notes" ? (
        <AllNotesLists></AllNotesLists>
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
          type === idType ? "bg-blue-600 text-white" : "border-2 border-neutral-300"
        } rounded-lg`}
      >
        {text}
      </button>
    );
  }
}
