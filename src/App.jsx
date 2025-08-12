import { useEffect, useState } from "react";
import { HashRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
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
            <Route path="/home" element={<Home></Home>}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthContextProvider>
  );

  function UserLayout() {
    const { loading,currentUser } = useAuth();
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

      if (!loading && !currentUser) {
        navigate("/");
      }

      console.log(loading,currentUser);

    },[loading]);

    return loading ? (
      <div className="flex items-center justify-center w-full h-screen ">
        <Spinner
          className={"h-24 w-24 text-black opacity-70"}
          isDark={true}
        ></Spinner>
      </div>
    ) : (
      <div className="grid md:grid-cols-[240px_1fr] relative md:gap-2 w-full">
        <NavBar showNav={showNav} setShowNav={setShowNav}></NavBar>

        <div className="md:px-8 overflow-y-auto h-screen md:p-0 w-full px-6">
          <Header setShowNav={setShowNav}></Header>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default App;
