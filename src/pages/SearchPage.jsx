import { useEffect, useState } from "react";
import {
  useJournalDatabaseManager,
  useNoteDatabaseManager,
} from "../hooks/dbManager";
import { HorizontalItemCard, ItemCard } from "../components/ItemsCard";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorWidget";
import { Greetings, WelcomeGreetings } from "../components/GreetingsComp";

export function SearchPage({ setSearchMode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [emptyResults, setEmptyResults] = useState(null);
  const [type, setType] = useState("journals");
  const [loading, setLoading] = useState(false);
  const [queryWord, setQueryWord] = useState("");
  const { queryJournals } = useJournalDatabaseManager();
  const { queryNotes } = useNoteDatabaseManager();

  useEffect(() => {
    setSearchMode(true);

    return () => setSearchMode(false);
  }, []);

  useEffect(() => {
    handleQuery();
  }, [type]);

  const handleQuery = async () => {
    setQueryWord(query);
    if (query && query != "") {
      if (type === "journals") {
        try {
          setLoading(true);
          await queryJournals(query).then((results) => {
            console.log(results);
            if (results.length != 0) {
              setEmptyResults(false);
              setResults(results);
            } else {
              setEmptyResults(true);
            }
          });
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
      } else if (type === "notes") {
        try {
          setLoading(true);
          await queryNotes(query).then((results) => {
            if (results.length != 0) {
              setEmptyResults(false);
              setResults(results);
            } else {
              setEmptyResults(true);
            }
          });
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="page-animate">
      <WelcomeGreetings message={"WELCOME"}></WelcomeGreetings>
      <div className="flex justify-end items-center w-full mt-8">
        <form
          action=""
          className="flex items-center max-w-sm h-13 py-1 w-[80%] shadow-bg rounded-full"
        >
          <input
            type="text"
            placeholder="Search ; title, events, notes, tags"
            className="bg-transparent  h-full font-light text-sm flex-1 pl-5"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleQuery();
            }}
            className="fa cursor-pointer fa-search py-2 bg-blue-500 rounded-full text-white px-3 text-base"
          ></button>
        </form>
        {/* <button className="fa fa-multiply text-2xl opacity-40"></button> */}
      </div>

      {loading ? (
        <Spinner
          isDark={true}
          className={"opacity-30 text-3xl m-auto mt-14"}
        />
      ) : emptyResults === false ? (
        <div>
          {" "} <h2 className="mt-8 text-xl opacity-40">
            {`Search Results for ' ${queryWord} '`}{" "}
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <SelectorButton idType={"journals"} />
            <SelectorButton idType={"notes"} />
          </div>
         
          <div className="grid md:grid-cols-[repeat(auto-fit,minmax(200px,250px))] gap-3 mt-6">
            {results.map((data, index) => (
              <ItemCard item={data} key={index}></ItemCard>
            ))}
          </div>
        </div>
      ) : (
        emptyResults === true && (
          <ErrorMessage message={`No results found for "${queryWord}"`} />
        )
      )}
    </div>
  );

  //  <HorizontalItemCard
  //                 key={index}
  //                 imgSrc={data?.imageSrc}
  //                 title={data.title}
  //                 prev={data.event ?? data.note}
  //                 date={data.created_at}
  //               ></HorizontalItemCard>

  function SelectorButton({ idType }) {
    return (
      <button
        onClick={() => {
          setType(idType);
        }}
        className={`md:px-5 md:h-10 px-5 h-10 text-sm ${
          type === idType
            ? "bg-blue-600 text-white"
            : "shadow-bg text-neutral-600"
        } rounded-2xl shadow-md`}
      >
        {idType}
      </button>
    );
  }
}
