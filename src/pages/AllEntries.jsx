import { useEffect, useState } from "react";
import { AllJournalLists } from "./JournalsList";
import { AllNotesLists } from "./NotesList";
import { useNavigate } from "react-router-dom";
import { getDateType, monthArray } from "../utils/date-formatter";
import { useAuth } from "../contexts/AuthContext";
import { Greetings } from "../components/GreetingsComp";

export function Entries({ listtype = "journals" }) {
  useEffect(() => {
    function getlastPage() {
      return localStorage.getItem("last-entry-page") ?? "journals";
    }
    setType(getlastPage);
  }, []);

  function setLastPage(lastpage) {
    localStorage.setItem("last-entry-page", lastpage);
  }

  const [type, setType] = useState(listtype);

  return (
    <div className=" flex flex-col gap-2 h-full">
      <Greetings></Greetings>
      <div className="flex gap-3 justify-end items-center md:mb-8 mb-4 mt-2">
        <SelectorButton
          idType={"journals"}
          text={"Journals"}
          onClick={() => {
            setType("journals");
            setLastPage("journals");
          }}
        ></SelectorButton>
        <SelectorButton
          idType={"notes"}
          text={"Notes"}
          onClick={() => {
            setType("notes");
            setLastPage("notes");
          }}
        ></SelectorButton>
        <div className="flex-grow flex justify-end">
          <FloatingActionButton
            type={type}
            text={type === "journals" ? "Add Journal" : "Add Note"}
          ></FloatingActionButton>
        </div>
      </div>
      <div className="">
        {type === "journals" ? (
          <AllJournalLists></AllJournalLists>
        ) : type === "notes" ? (
          <AllNotesLists></AllNotesLists>
        ) : (
          ""
        )}
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

function FloatingActionButton({ text, type }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(type === "journals" ? "/editor/journals" : "/editor/notes");
      }}
      className="fa-bounce shadow-md md:p-3 p-2 flex right-5 w-fit bottom-5 rounded-lg items-center shadow-bg gap-2"
    >
      <i className="fa fa-plus text-blue-600 text-xl"></i>
      <p className="opacity-70 text-sm md:flex hidden">{text}</p>
    </button>
  );
}
