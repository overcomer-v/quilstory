import { useEffect, useState } from "react";
import {
  HashRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AllJournalLists } from "./pages/JournalsList";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { FrontPage } from "./pages/FrontPage";
import { JournalEditor } from "./pages/JournalEditor";
import { SignInPage } from "./pages/SignInPage";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";
import { Spinner } from "./components/Spinner";
import { Home } from "./pages/Home";
import { Entries } from "./pages/AllEntries";
import { Editor } from "./pages/Editor";
import { NotesEditor } from "./pages/NotesEditor";
import { ItemView } from "./pages/ItemView";

function App() {
  return (
    <AuthContextProvider>
      <HashRouter>
        <Routes>
          {" "}
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/sign-in/:type" element={<SignInPage />}></Route>
          <Route element={<UserLayout />}>
            <Route path="/entries" element={<Entries />}></Route>
            <Route
              path="/editor/:entryType?"
              element={<Editor></Editor>}
            ></Route>
            <Route path="/item-view/:type/:itemId" element = {<ItemView></ItemView>}></Route>
            <Route
              path="/journal-editor/:journalId?"
              element={<JournalEditor></JournalEditor>}
            ></Route>
             <Route
              path="/note-editor/:noteId?"
              element={<NotesEditor></NotesEditor>}
            ></Route>
            <Route
              path="/note-editor"
              element={<NotesEditor></NotesEditor>}
            ></Route>

            <Route path="/home" element={<Home></Home>}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthContextProvider>
  );

  function UserLayout() {
    const { loading, currentUser } = useAuth();
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !currentUser) {
        navigate("/");
      }

    }, [loading]);

    return loading ? (
      <div className="flex items-center justify-center w-full h-screen ">
        <Spinner
          className={"h-16 w-16 text-black opacity-30"}
          isDark={true}
        ></Spinner>
      </div>
    ) : (
      <div className="grid md:grid-cols-[240px_1fr] relative md:gap-2 w-full h-full lg:min-w-6xl">
        <NavBar showNav={showNav} setShowNav={setShowNav}></NavBar>

        <div className=" overflow-y-auto h-screen md:p-0 w-full relative">
          <Header setShowNav={setShowNav}></Header>
          <div className="px-5 h-full mt-6 ">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
