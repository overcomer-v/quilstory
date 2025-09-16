import { useNavigate } from "react-router-dom";
import { ChooseCard } from "../components/Choose-Us-Card";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";

export function FrontPage() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !loading) {
      navigate("/home");
      console.log("User already signed in :", currentUser);
    }else{
      console.log("User not signed in");
    }
  }, [currentUser, loading]);

const t = true;

  return (
    <div className="relative">
      { loading ? (
        <div className="bg-black z-50 bg-opacity-70  w-screen items-center justify-center h-screen flex flex-col fixed">
          <Spinner className={"h-14 w-14 "}></Spinner>
          <div className="mt-1 text-white font-light">Getting Accounts...</div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col ">
        <div className="flex  overflow-hidden relative h-[95vh] bg-[url(/images/d74be058-2c2f-4809-b5da-64f08e9d374c.jpeg)] bg-cover">
          <section className=" flex flex-col bg-opacity-60 w-full bg-black justify-between">
            {" "}
            <HomeHeader></HomeHeader>
            <div className="flex m-auto text-center items-center text-white flex-col md:w-3/4 z-10 px-12 py-12">
              <h1 className="text-5xl font-bold">
                Your Story One Moment At A Time
              </h1>
              <p className="font-light mt-4 opacity-80 text-sm">
                Write, snap and revisit the days that matters to you. Dont just
                take pictures-preserve the story behind them{" "}
              </p>
              <div className="flex gap-3 mt-8">
                <button
                  className="border-gray-200 border-2 px-6 py-3 rounded-3xl flex items-center gap-4"
                  onClick={() => {
                    navigate("/sign-in/sign-up");
                  }}
                >
                  <p className="">Get Started</p>
                  <i className="fa fa-arrow-right text-blue-500 "></i>
                </button>
              </div>
            </div>
          </section>
        </div>
        <section
          id="why-choose-us"
          className="flex-col gap-12 flex items-start mt-24 px-8"
        >
          <div className="text-left">
            <h2 className=" bg-blue-400 w-fit px-3 text-white py-1 rounded-sm text-xs mb-1">
              WHY US?
            </h2>
            <h1 className="text-3xl font-bold">Your Diary AnyWhere</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ChooseCard
              title={"Simple & Intuitive Interface"}
              text={`We believe recording your thoughts should be effortless.
            Our clean design helps you focus on what matters-- Your memories.`}
            ></ChooseCard>
            <ChooseCard
              title={"Secure & Private"}
              text={`Your diary is yours and yours alone. All entries are stored securely in the cloud.
              So your personal moment is personal`}
            ></ChooseCard>
            <ChooseCard
              title={"Attach Pictures to Your Memories"}
              text={`A picture says a thousand word. Add photos to your entries to capture your day fullyy`}
            ></ChooseCard>
            <ChooseCard
              title={"Keep Your Memories Forever"}
              text={`We believe recording your thoughts should be effortless.
            Our clean design helps you focus on what matters-- Your memories`}
            ></ChooseCard>
          </div>
        </section>
        <footer id="footer" className="flex md:flex-row flex-col text-white gap-8 justify-center md:justify-between items-center mt-8 px-8 py-10 bg-[rgb(10,20,35)]">
        <div className="flex items-center gap-6">
            <h1 className="text-xl">Quilstory</h1>
          <div className=" flex border-l-2 border-l-white pl-6 flex-col text-xs font-light opacity-35">
            <span>@ 2025</span>
            <span>Built by Atoyeje Overcomer</span>
            <span>{"Tech stacks -> React + Supabase"}</span>
          </div>

        </div>
          <div className="flex gap-4">
            <SocialLinks
            iconData={"fab fa-google"}
            to={"mailto:atoyejeovercomer2@gmail.com?subject=Hiring%20Inquiry"}
          ></SocialLinks>
          <SocialLinks
            iconData={"fab fa-github"}
            to={"https://github.com/overcomer-v"}
          ></SocialLinks>
          <SocialLinks
            iconData={"fab fa-twitter"}
            to={"https://x.com/victor_atoyeje_?s=09"}
          ></SocialLinks>
          </div>
        </footer>
      </div>
    </div>
  );

  function SocialLinks({ iconData, to }) {
  return (
    <a href={to} className="opacity-50">
      <i className={`${iconData} `}></i>
    </a>
  );
}

  // function Dialog({ edit }) {
  //   return (
  //     <div className="flex flex-col p-8 bg-white text-black ">
  //       <p>Account already signed in. Do you want to continue ?</p>
  //       <div className="flex justify-between [&>button]:p-2 [&>button]:bg-blue-500  [&>button]:p-2">
  //         <button>Sign Out</button> 
  //         <button>Continue</button>
  //       </div>
  //     </div>
  //   );
  // }
  function HomeHeader() {
    return (
      <header className="flex text-white md:px-16 px-6 rounded-3xl mx-4 my-4 py-4 bg-black bg-opacity-20 justify-between items-center gap-6 mb-6">
        <div className="flex gap-4 items-center">
          <i className="fa fa-pencil text-blue-500"></i>{" "}
          <div className="text-xl font-bold ">QuilStory</div>
        </div>
        <div className="md:flex gap-6 text-sm hidden">
          
          <a href="#footer">About Us</a>
          <a href="#footer">Contact Us</a>
        </div>
        <div className="flex gap-4 text-sm">
          <button
            className="md:px-5 px-4 py-2 border-2 border-white rounded-xl text-xs md:text-sm"
            onClick={() => {
              navigate("/sign-in/sign-up");
            }}
          >
            SignUp
          </button>
          <button
            className="md:px-5 px-4 py-2 bg-blue-600 rounded-xl text-white text-xs md:text-sm"
            onClick={() => {
              navigate("/sign-in/sign-in");
            }}
          >
            LogIn
          </button>
        </div>
      </header>
    );
  }
}
