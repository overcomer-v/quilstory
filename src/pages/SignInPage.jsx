import { useEffect, useState } from "react";
import { googleSignIn, logIn, signUp } from "../utils/authenticate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { useJournalDatabaseManager } from "../hooks/dbManager";

export function SignInPage() {
  const { type } = useParams();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !loading) {
      navigate("/home");
    }
  }, [currentUser, loading]);

  return (
    <div className="relative">
      <div className="z-[100] relative ">
        {type === "sign-up" && <SignUpLayout></SignUpLayout>}
        {type === "sign-in" && <SignInLayout></SignInLayout>}
      </div>
      <img
        className="fixed top-0 bottom-0 opacity-5 right-0 left-0 w-full h-full object-cover z-10"
        src="/images/d74be058-2c2f-4809-b5da-64f08e9d374c.jpeg"
        alt=""
      />
    </div>
  );

  function SignUpLayout() {
    const { uploadEvent } = useJournalDatabaseManager();
    const [authError, setAuthError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [spinnerLoading, setSpinnerLoading] = useState(false);

    return (
      <div className="h-screen flex justify-center items-center w-full page-animate">
        <form  action="" className="md:w-[65%] w-[75%] max-w-[26rem] m-auto flex justify-center items-start flex-col [&>input]:bg-opacity-70 [&>input]:py-3 [&>input]:rounded-lg [&>input]:bg-neutral-100 [&>label]:font-light [&>label]:mt-4 [&>label]:mb-1 [&>label]:opacity-90 [&>label]:text-base ">
          <div className="mb-4 flex flex-col">
            <h2 className="text-left w-full text-4xl font-bold">
              Sign Up
            </h2>
            <p className="font-light text-xs opacity-30">Let's sign you up to continue</p>
          </div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            onClick={() => {
              setAuthError(null);
            }}
            className=" w-full placeholder:font-light placeholder:text-sm px-3 border-neutral-300 border-[1px]"
            placeholder=""
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            onClick={() => {
              setAuthError(null);
            }}
            className=" placeholder:font-light placeholder:text-sm w-full px-3 border-neutral-300 border-[1px]"
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAuthError(null);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            onClick={() => {
              setAuthError(null);
            }}
            className=" placeholder:font-light placeholder:text-sm w-full px-3 border-neutral-300 border-[1px] "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 w-full my-6 bg-blue-600 rounded-md text-white justify-center flex items-center gap-6"
            onClick={async (e) => {
              e.preventDefault();
              if (userName && email && password) {
                try {
                  setSpinnerLoading(true);
                  await signUp(email, password, userName, uploadEvent);
                } catch (error) {
                  setAuthError(error.message);
                } finally {
                  setSpinnerLoading(false);
                }
              } else {
                alert("All fields must be filled");
              }
            }}
          >
            <p>Sign In</p>
            <Spinner
              className={`h-4 w-4 ${spinnerLoading ? "" : "hidden"}`}
            ></Spinner>
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                setSpinnerLoading(true);
                await googleSignIn();
              } catch (error) {
                setAuthError(error.message);
              } finally {
                setSpinnerLoading(false);
              }
            }}
            className="px-6 py-3 mb-6 w-full items-center justify-center flex gap-2 rounded-md border-[1px] border-neutral-300"
          >
            <img
              className="w-4 h-4"
              src="/images/icons8-google-50.png"
              alt=""
            />
            <p>Sign up with Google </p>
          </button>

          <p
            className={`w-full text-left text-sm font-light text-red-500 ${
              authError ? "" : "hidden"
            }`}
          >
            {authError}
          </p>

          <Link
            className="flex gap-2 text-blue-500 font-light text-sm items-center justify-start w-full"
            to={"/sign-in/sign-in"}
          >
            <p>Already have an account ?</p>
            <i className="fa fa-arrow-right"></i>
          </Link>
        </form>
      </div>
    );
  }
  function SignInLayout() {
    const [authError, setAuthError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinnerLoading, setSpinnerLoading] = useState(false);

    return (
      <div className="h-screen flex w-full page-animate">
        <div className="md:w-[65%] w-[80%] max-w-[26rem] m-auto flex justify-center items-start flex-col [&>label]:mt-6 [&>label]:mb-1 font-light">
  <h2 className="text-left w-full text-4xl font-bold">
              Sign In
            </h2>
            <p className="font-light text-xs opacity-30">Let's sign you in to continue</p>
          
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md w-full h-12 px-2 placeholder:font-light placeholder:text-sm border-neutral-300 border-[1px]"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md h-12 w-full px-2 placeholder:font-light placeholder:text-sm border-neutral-300 border-[1px] "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="px-6 py-3 my-6 w-full bg-blue-600 rounded-md text-white justify-center flex items-center gap-6"
            onClick={async () => {
              if (email && password) {
                try {
                  setSpinnerLoading(true);
                  await logIn(email, password);
                } catch (error) {
                  setAuthError(error.message);
                } finally {
                  setSpinnerLoading(false);
                }
              } else {
                alert("All fields must be filled");
              }
            }}
          >
            <p>Sign In</p>
            <Spinner
              className={`h-4 w-4 ${spinnerLoading ? "" : "hidden"}`}
            ></Spinner>
          </button>

          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                setSpinnerLoading(true);
                await googleSignIn();
              } catch (error) {
                setAuthError(error.message);
              } finally {
                setSpinnerLoading(false);
              }
            }}
            className="px-6 py-3 mb-6 w-full items-center justify-center flex gap-2 rounded-md border-[1px] border-neutral-300"
          >
            <img
              className="w-4 h-4"
              src="/images/icons8-google-50.png"
              alt=""
            />
            <p>Sign In with Google </p>
          </button>

          <p
            className={`w-full text-left text-sm font-light text-red-500 ${
              authError ? "" : "hidden"
            }`}
          >
            {authError}
          </p>

          <Link
            className="flex gap-2 text-blue-500 font-light text-sm items-center justify-start w-full"
            to={"/sign-in/sign-up"}
          >
            <p>Create New Account</p>
            <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    );
  }
}
