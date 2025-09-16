import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMediaQuery } from "../hooks/mediaQuery";

export function Header({ setShowNav, searchMode }) {
  const { userName } = useAuth();
  const matches = useMediaQuery("(max-width: 768px)");
  function getCurrentNav() {
    // if (currentNav === "/") {
    //   return "Home";
    // } else {
    //   const cN = currentNav.replace("/", "").replace("-", " ");
    //   return capitalizeWords(cN);
    // }
    return "Home"
  }

  // function capitalizeWords(str = "") {
  //   return str
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(" ");
  // }

  function getUsername() {
    return userName ? userName : "Login";
  }

  return (
    <div >
      { matches ? (
    <SmallScreensHeader setShowNav={setShowNav}></SmallScreensHeader>
  ) : (
    <LargeScreenHeader></LargeScreenHeader>
  )}
    </div>
  );

  function SmallScreensHeader({ setShowNav }) {

        const navigate = useNavigate();

    return (
      <header className="flex shadow-md sticky top-0 shadow-bg justify-between items-center py-3 mx-2 px-4 z-[900] rounded-lg mt-2 md:mb-8 mb-4 text-lg ">
        <i
          className="fa fa-bars"
          onClick={() => {
            setShowNav((e) => !e);
          }}
        ></i>
        <h1 className="text-blue-600 text-xl font-bold">
          QuilStory
        </h1>
        <div className="flex gap-4">
          <i className="fa fa-search" onClick={()=>{
            navigate("/search-page")
          }}></i>
        </div>
      </header>
    );
  }

  function LargeScreenHeader() {

    const navigate = useNavigate();

    return <header className={`flex sticky top-0 justify-between shadow-sm px-4 rounded-lg items-center gap-6 pb-4 pt-4 w-full bg-main z-[1000] searchMode ${searchMode? `hidden`:""}`}>
      {/* <div className="text-xl font-bold opacity-70">{getCurrentNav()}</div> */}
      <div onClick={()=>{
        navigate("/search-page");
      }} className="flex gap-2 px-4 py-3 cursor-pointer max-w-xs grow w-full bg-neutral-100 rounded-3xl items-center">
        <i className="fa fa-search opacity-70"></i>
        <p
          className="h-full opacity-50 w-full bg-transparent font-light">
         Search
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          className="h-8 w-8 rounded-full"
          src="\images\Capture the Trail With Nature Journaling.jpeg"
          alt="profile picture"
        />
        <div>
          <h3 className="text-sm">{getUsername()?.toString()}</h3>
          <div className=" flex items-center gap-2">
            {" "}
            <p className="text-xs opacity-40 font-light">admin</p>
            <div className="h-2 w-2 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>;
  }
}
