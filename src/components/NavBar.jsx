import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../utils/mfirebase";
import { signOut } from "firebase/auth";
import { useMediaQuery } from "../hooks/mediaQuery";
import { supabase } from "../utils/supabase-client";

export function NavBar({ showNav, setShowNav }) {
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 768px)");
  const navRef = useRef(null);

  if (!matches) {
    showNav = true;
  }

  useEffect(() => {
    function handleOffsiteClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNav(false);
      }
    }
    if (showNav) {
      setTimeout(() => {
        document.addEventListener("click", handleOffsiteClick);
      }, 100);
    }

    return () => {
      document.removeEventListener("click", handleOffsiteClick);
    };
  }, [showNav]);

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully");
    }
  };

  return (
    <nav
      ref={navRef}
      className={`flex h-full md:w-[230px] w-[230px] flex-col gap-2 md:px-4 overflow-hidden md:sticky absolute z-[1000] shadow-bg md: background-color: rgb(250, 250, 250);
 ${
   !matches || showNav ? " left-0" : " -left-60"
 } transition-all ease-in-out duration-500 pr-2 pl-2 py-8 border-r-[1px]`}
    >
      <div className="flex items-center gap-2 ml-3 mb-3">
        {" "}
        <i className="fa fa-pencil -rotate-90 rounded-md shadow-sm bg-neutral-300 text-neutral-100 p-[0.4rem] text-[0.6rem]"></i>
        <h1 className="text-blue-600 text-xl font-bold">QuilStory</h1>
      </div>
      <div className="flex h-[90%] flex-col items-start w-full">
        <div className="gap-1 flex flex-col w-full">
          <div className="opacity-30 text-xs ml-9 mt-4 mb-3 flex gap-4 items-center">
            <p>Personal</p>
            <div className="w-[40%] bg-neutral-400 h-[1px]"></div>
          </div>
          <NavButton
            label={"Home"}
            iconClass={"fa-home"}
            to={"/home"}
          ></NavButton>

          <NavButton
            label={"Entries"}
            iconClass={"fa-bullseye"}
            to={"/entries"}
          ></NavButton>

          <NavButton
            label={"Editor"}
            iconClass={"fa-pen"}
            to={"/editor"}
          ></NavButton>
          {/* <NavButton
          label={"All Medias"}
          iconClass={"fa-images"}
          to={"/all-medias"}
        ></NavButton> */}

          {/* <h5 className="opacity-40 ml-9 text-xs mb-4 mt-6">General</h5>
        <NavButton
          label={"About Us"}
          iconClass={"fa-bullseye"}
          to={"/about-us"}
        ></NavButton>
        <NavButton
          label={"Contact Us"}
          iconClass={"fa-bullseye"}
          to={"/contact-us"}
        ></NavButton> */}
        </div>
         <div className="opacity-30 w-full text-xs ml-9 mt-12 mb-1 flex gap-4 items-center">
            <p>General</p>
            <div className="w-[40%] bg-neutral-400 h-[1px]"></div>
          </div>
        <button
          className="  text-blue-500 flex gap-2 items-center pl-9 mt-4 text-sm"
          onClick={async () => {
            await signOutUser();
            navigate("/");
          }}
        >
          <i className="fa fa-sign-out text-sm rotate-180"></i>
          <p>Sign Out</p>
        </button>
      </div>
    </nav>
  );

  function NavButton({ label, iconClass, to }) {
    const location = useLocation();
    const [isActive, setIsActive] = useState();

    useEffect(() => {
      to === location.pathname ? setIsActive(true) : setIsActive(false);
    }, [location.pathname]);

    const color = isActive
      ? "text-blue-500 opacity-100"
      : "text-black opacity-40";
    const borderColor = isActive ? "bg-blue-500 " : "bg-transparent";
    const textOpacity = isActive ? "opacity-100" : "opacity-50";
    const bg = isActive ? "bg-[rgb(200,200,200,0.4)]" : "";

    return (
      <Link
        to={to}
        onClick={() => {
          setShowNav(false);
        }}
        className={`gap-4 w-full hover:bg-neutral-200 ${bg} text-black md:py-4 py-3 rounded-xl flex items-center justify-start`}
      >
        <div className={`mr-3 ${borderColor} h-7 w-2 rounded-lg`}></div>
        <div className="flex gap-4 items-center justify-start">
          <i className={`fa ${iconClass} ${color} `}></i>
          <div className={`${textOpacity} text-sm`}>{label} </div>
        </div>
      </Link>
    );
  }
}
