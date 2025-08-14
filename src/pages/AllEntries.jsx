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
      <div className="relative">
        {type === "journals" ? (
          <AllJournalLists></AllJournalLists>
        ) : type === "notes" ? (
          <AllNotesLists></AllNotesLists>
        ) : (
          ""
        )}
        <FloatingActionButton text={type === "journals" ? "Add Journal" : "Add Note"}></FloatingActionButton>
      </div>
    </div>
  );

  function SelectorButton({ idType, text, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`md:px-5 md:h-10 px-5 h-10 text-sm ${
          type === idType ? "bg-blue-600 text-white" : "shadow-md shadow-bg"
        } rounded-2xl`}
      >
        {text}
      </button>
    );
  }
}

function FloatingActionButton({ text }) {
  return (
    <button className="fa-bounce fa shadow-md p-3 flex absolute right-5 bottom-5 rounded-lg items-center shadow-bg gap-2">
      <i className="fa fa-plus text-blue-600 text-xl"></i>
      <p className="opacity-70 text-sm">{text}</p>
    </button>
  );
}
