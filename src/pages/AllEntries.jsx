import { useState } from "react";
import { AllJournalLists } from "./JournalsList";
import { AllNotesLists } from "./NotesList";
import { useNavigate } from "react-router-dom";
import { getDateType, monthArray } from "../utils/date-formatter";
import { useAuth } from "../contexts/AuthContext";

export function Entries({ listtype = "journals" }) {
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
          }}
        ></SelectorButton>
        <SelectorButton
          idType={"notes"}
          text={"Notes"}
          onClick={() => {
            setType("notes");
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

function Greetings() {
  const date = new Date();
  const {currentUser} = useAuth();


  function greeting (){
    if (date.getHours() < 12) {
      return "GoodMorning";
    } else if (date.getHours() > 11 && date.getHours() < 16) {
      return "GoodAfternoon";
    }else if (date.getHours() > 16){
      return "GoodEvening"
    }
    
  };
  return (
    <div className=" flex justify-between">
      <div>
              <h1 className="text-2xl">{greeting()}</h1>
              <p className="opacity-50 font-light">{currentUser.displayName}</p>

      </div>
      <div className="flex gap-1 items-center font-light [&_p]:text-xs [&_p]:opacity-80  leading-none">
        <h1 className="md:text-4xl text-3xl">
          {date.getDate()}
          <span className="text-sm opacity-40">
            {getDateType(date.getDate())}
          </span>
        </h1>
        <div className="flex flex-col leading-none">
          <p>{monthArray[date.getMonth()]}</p>
          <p>{date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

function FloatingActionButton({ text, type }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(type === "journals" ? "/editor/journals" : "/editor/notes");
      }}
      className="fa-bounce shadow-md p-3 flex right-5 w-fit bottom-5 rounded-lg items-center shadow-bg gap-2"
    >
      <i className="fa fa-plus text-blue-600 text-xl"></i>
      <p className="opacity-70 text-sm">{text}</p>
    </button>
  );
}
