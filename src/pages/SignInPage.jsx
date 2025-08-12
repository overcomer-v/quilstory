import { useEffect, useState } from "react";
import { logIn, signInWithGoogle, signUp } from "../utils/authenticate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import { firebaseErrorMessagesMap } from "../utils/firebaseErrorMap";
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

  switch (type) {
    case "sign-up":
      return <SignUpLayout></SignUpLayout>;
    case "sign-in":
      return <SignInLayout></SignInLayout>;
    default:
      break;
  }

  function SignUpLayout() {
    const { uploadEvent } = useJournalDatabaseManager();
    const [authError, setAuthError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [spinnerLoading, setSpinnerLoading] = useState(false);

    return (
      <div className="h-screen flex bg-neutral-100 justify-center items-center w-full">
        <div className="md:w-[65%] w-[80%] max-w-md m-auto flex justify-center items-center flex-col gap-6">
          <h2 className="text-left w-full text-3xl font-bold">Sign Up</h2>
          <input
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md w-full h-12 px-2 border-neutral-300 border-[1px]"
            placeholder="Username"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <input
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md w-full h-12 px-2 border-neutral-300 border-[1px]"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAuthError(null);
            }}
          />
          <input
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md h-12 w-full px-2 border-neutral-300 border-[1px] "
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="px-6 py-2 w-full bg-blue-600 rounded-md text-white justify-center flex items-center gap-6"
            onClick={async () => {
              if (userName && email && password) {
                try {
                  setSpinnerLoading(true);
                  return await signUp(email, password, userName, uploadEvent);
                } catch (error) {
                  setAuthError(firebaseErrorMessagesMap[error.code]);
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
           onClick={ async () => {
             try {
                  setSpinnerLoading(true);
                  return await signInWithGoogle(uploadEvent);
                } catch (error) {
                  setAuthError(firebaseErrorMessagesMap[error.code]);
                } finally {
                  setSpinnerLoading(false);
                }
              
            }}
          className="px-6 py-2 w-full items-center justify-center flex gap-2 rounded-md border-[1px] border-neutral-300">
            <i className="fab fa-google text-blue-700"></i>
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
            className="flex gap-2 text-blue-500 text-sm items-center justify-start w-full"
            to={"/sign-in/sign-in"}
          >
            <p>Already have an account ?</p>
            <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    );
  }
  function SignInLayout() {
    const [authError, setAuthError] = useState(null);
    const { uploadEvent } = useJournalDatabaseManager();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinnerLoading, setSpinnerLoading] = useState(false);

    return (
      <div className="h-screen bg-neutral-100 flex w-full">
        <div className="md:w-[65%] w-[80%] max-w-md m-auto flex justify-center items-center flex-col gap-6">
          <h2 className="text-left w-full text-3xl font-bold">Sign In</h2>

          <input
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md w-full h-12 px-2 border-neutral-300 border-[1px]"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            onClick={() => {
              setAuthError(null);
            }}
            className="rounded-md h-12 w-full px-2 border-neutral-300 border-[1px] "
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="px-6 py-2 w-full bg-blue-600 rounded-md text-white justify-center flex items-center gap-6"
            onClick={async () => {
              if (email && password) {
                try {
                  setSpinnerLoading(true);
                  return await logIn(email, password);
                } catch (error) {
                  setAuthError(firebaseErrorMessagesMap[error.code]);
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
            onClick={ async () => {
               try {
                  return await signInWithGoogle(uploadEvent);
                } catch (error) {
                  setAuthError(firebaseErrorMessagesMap[error.code]);
                } 
              
            }}
            className="px-6 py-2 w-full items-center justify-center flex gap-2 rounded-md border-[1px] border-neutral-300"
          >
            <i className="fab fa-google text-blue-700"></i>
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
            className="flex gap-2 text-blue-500 text-sm items-center justify-start w-full"
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
