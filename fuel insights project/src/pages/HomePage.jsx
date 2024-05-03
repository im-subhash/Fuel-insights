import React, { useEffect, useState } from "react";
// import homeBgVideo from "../assets/bgVideo.mp4";
import homeBgVideo from "../assets/homoBgVideo.mp4";
// import homeBgVideo from "../assets/HomeBgVideoNew.mp4";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((store) => store.userSlice.user);
  const [displaySecondLine, setDisplaySecondLine] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplaySecondLine(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    // video component
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center  ">
      <div className="absolute z-0 w-full h-full bg-black opacity-50 "></div>
      <video
        src={homeBgVideo}
        autoPlay="true"
        loop="true"
        muted="true"
        className="absolute inset-0 w-full h-full object-cover"
      ></video>
      {/* tagline and description */}
      {/* <div className=" absolute top-20 w-full h-full left-0 "></div> */}
      <div className=" relative z-50 w-full flex flex-col items-center text-white  p-4 gap-3">
        <div className="">
          <div className="animate-pulse text-wrap text-center md:text-2xl text-lg font-bold font-Lexend">
            Fuel Insights: Protecting Every Drop, Preventing Every Drain
          </div>
        </div>
        {
          <div className="">
            {!user && (
              <Link to="/login">
                <a
                  href="#_"
                  className="inline-flex items-center justify-center w-full px-4 py-2 mb-2 md:text-lg text-sm text-white bg-red-600 rounded-md hover:bg-red-400 sm:w-auto sm:mb-0"
                  data-primary="green-400"
                  data-rounded="rounded-2xl"
                  data-primary-reset="{}"
                >
                  Get Started
                  <svg
                    class="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            )}
            {user && (
              <Link to="/tripAnalysis">
                <a
                  href="#_"
                  class="inline-flex items-center justify-center w-full px-4 py-2 mb-2 text-lg text-white bg-red-600 rounded-md hover:bg-red-400 sm:w-auto sm:mb-0"
                  data-primary="green-400"
                  data-rounded="rounded-2xl"
                  data-primary-reset="{}"
                >
                  Get Started
                  <svg
                    class="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            )}
          </div>
        }
      </div>
      {/* services card */}
      {/* <div className=" flex mt-">
          
    <div
  class="absolute grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
  <div
    class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
    <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
  </div>
  <div class="relative p-6 px-6 py-14 md:px-12">
    <h2 class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
      How we design and code open-source projects?
    </h2>
    <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
      Tania Andrew
    </h5>
    <img alt="Tania Andrew"
      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
      class="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center" />
  </div>
</div>  

    </div> */}
    </div>
  );
};

export default HomePage;
