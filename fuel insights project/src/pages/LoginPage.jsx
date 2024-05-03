import React from "react";
import { Link, redirect } from "react-router-dom";
import { BASE_URL } from "../configs/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log("response data---", data);
      if (data.status == "failed") {
        setError(response.message);
      } else {
        dispatch(addUser(data.data));
        localStorage.setItem("userData", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
        console.log("login successful");
        navigate("/tripAnalysis");
      }
    } catch (err) {
      setError("something went wrong in login!");
    }
  };
  // return (
  //   <section>
  //     <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
  //       <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
  //         <div className="mb-2 flex justify-center">
  //           {/* <svg
  //             width="50"
  //             height="56"
  //             viewBox="0 0 50 56"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
  //               fill="black"
  //             />
  //           </svg> */}
  //           <img src="https://firebasestorage.googleapis.com/v0/b/mykriyeta.appspot.com/o/knowledgebaseFiles%2F7639d1e0-cdcb-11ee-add7-ad44366ebdbf?alt=media&token=0ad89b6f-9034-4176-8008-5a5af83b3d76" className="w-32"/>
  //         </div>
  //         <h2 className="text-center text-2xl font-bold leading-tight text-blue-500">
  //           Sign in to your account
  //         </h2>
  //         <p className="mt-2 text-center text-sm text-gray-600 ">
  //           Don&apos;t have an account?{" "}
  //           <Link
  //             to="/register"
  //             title=""
  //             className="font-semibold text-black transition-all duration-200 hover:underline underline"
  //           >
  //             Create a free account
  //           </Link>
  //         </p>
  //         <form action="#" className="mt-8">
  //           <div className="space-y-5">
  //             <div>
  //               <label
  //                 htmlFor=""
  //                 className="text-base font-medium text-gray-900"
  //               >
  //                 {" "}
  //                 Email address{" "}
  //               </label>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="email"
  //                   placeholder="Email"
  //                   name="email"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <div className="flex items-center justify-between">
  //                 <label
  //                   htmlFor=""
  //                   className="text-base font-medium text-gray-900"
  //                 >
  //                   {" "}
  //                   Password{" "}
  //                 </label>
  //                 <Link
  //                   to="#"
  //                   title=""
  //                   className="text-sm font-semibold text-black hover:underline"
  //                 >
  //                   {" "}
  //                   Forgot password?{" "}
  //                 </Link>
  //               </div>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="password"
  //                   placeholder="Password"
  //                   name="password"
  //                   value={password}
  //                   onChange={(e) => setPassword(e.target.value)}
  //                 ></input>
  //               </div>
  //               {error && <div className="text-s text-red-500"> {error} </div>}
  //             </div>

  //             <div>
  //               <button
  //                 type="submit"
  //                 onClick={(e) => handleLogin(e)}
  //                 className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-400"
  //               >
  //                 Get started
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <div className="min-h-screen">
      <div>
        <section class="min-h-screen  bg-gray-50 bg-gradient-to-t from-gray-700 to-black">
          <div class="flex flex-col items-center justify-center align-middle px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border mt-20 md:mt-0  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username@gmail.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <a
                      href="#"
                      class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    onClick={(e) => handleLogin(e)}
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <Link to="/register">
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <a
                        href="#"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </Link>
                </form>
              </div>
              <p className="text-red-500 ">{error ? error : ""}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
