import { useAuth } from "../contexts/AuthContext";
import { useMediaQuery } from "../hooks/mediaQuery";

export function Header({ setShowNav }) {
  const { currentUser } = useAuth();
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
    return currentUser ? currentUser.displayName : "Login";
  }

  return matches ? (
    <SmallScreensHeader setShowNav={setShowNav}></SmallScreensHeader>
  ) : (
    <LargeScreenHeader></LargeScreenHeader>
  );

  function SmallScreensHeader({ setShowNav }) {
    return (
      <header className="flex justify-between items-center py-5 mb-4 text-lg">
        <i
          className="fa fa-bars"
          onClick={() => {
            setShowNav((e) => !e);
          }}
        ></i>
        <h1 className="text-blue-600 text-2xl ml-9 font-bold">
          QuilStory
        </h1>
        <div className="flex gap-4">
          <i className="fa fa-search"></i>
          <i className="fa fa-bullseye"></i>
        </div>
      </header>
    );
  }

  function LargeScreenHeader() {
    return <header className="flex justify-between items-center gap-6 mb-12 pt-4">
      <div className="text-xl font-bold opacity-70">{getCurrentNav()}</div>
      <div className="flex gap-2 px-4 py-3 max-w-xs grow bg-neutral-100 rounded-3xl items-center">
        <i className="fa fa-search opacity-70"></i>
        <input
          className="h-full w-full bg-transparent font-light"
          type="text"
          placeholder="Search"
        />
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
