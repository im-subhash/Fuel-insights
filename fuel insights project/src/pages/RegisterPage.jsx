import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../configs/config";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

// import styled from 'styled-components'

export default function RegisterPage() {
  const [hellow, setGekkiw] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [tc, setTc] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserRegister = async (e) => {
    e.preventDefault();
    console.log("-------register called");
    try {
      const response = await fetch(`${BASE_URL}user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
          phone,
          role,
          tc,
        }),
      });

      const data = await response.json();
      console.log("-----user : ", data);
      if (data.status === "failed") {
        setError(data.message);
      } else {
        dispatch(addUser(data.data));
        localStorage.setItem("userData", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
        console.log("register successful");
        navigate("/");
      }
    } catch (err) {
      setError("something went wrong. try Again!");
    }
  };

  // return (
  //   <section>
  //     <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
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
  //           Register to create account
  //         </h2>
  //         <p className="mt-2 text-center text-base text-gray-600">
  //           Already registered{" "}
  //           <Link
  //             to="/login"
  //             title=""
  //             className="font-medium text-black transition-all duration-200 hover:underline underline"
  //           >
  //             Sign In
  //           </Link>
  //         </p>
  //         <form className="mt-8">
  //           <div className="space-y-5">
  //             <div>
  //               <label
  //                 htmlFor="name"
  //                 className="text-base font-medium text-gray-900"
  //               >
  //                 {" "}
  //                 Full Name{" "}
  //               </label>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="text"
  //                   placeholder="Full Name"
  //                   id="name"
  //                   value={name}
  //                   onChange={(e) => setName(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <label
  //                 htmlFor="email"
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
  //                   id="email"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <div className="flex items-center justify-between">
  //                 <label
  //                   htmlFor="password"
  //                   className="text-base font-medium text-gray-900"
  //                 >
  //                   {" "}
  //                   Password{" "}
  //                 </label>
  //               </div>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="password"
  //                   placeholder="Password"
  //                   id="password"
  //                   value={password}
  //                   onChange={(e) => setPassword(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <div className="flex items-center justify-between">
  //                 <label
  //                   htmlFor="conform password"
  //                   className="text-base font-medium text-gray-900"
  //                 >
  //                   {" "}
  //                   Conform Password{" "}
  //                 </label>
  //               </div>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="password"
  //                   placeholder="Conform Password"
  //                   id="password"
  //                   value={password_confirmation}
  //                   onChange={(e) => setPasswordConfirmation(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <label
  //                 htmlFor="name"
  //                 className="text-base font-medium text-gray-900"
  //               >
  //                 {" "}
  //                 Phone No.{" "}
  //               </label>
  //               <div className="mt-2">
  //                 <input
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   type="number"
  //                   maxLength="10"
  //                   placeholder="98765XXX"
  //                   id="pohone_no"
  //                   value={phone}
  //                   onChange={(e) => setPhone(e.target.value)}
  //                 ></input>
  //               </div>
  //             </div>
  //             <div>
  //               <label
  //                 htmlFor="name"
  //                 className="text-base font-medium text-gray-900"
  //               >
  //                 {" "}
  //                 Role{" "}
  //               </label>
  //               <div className="mt-2">
  //                 <select
  //                   value={role}
  //                   onChange={(e) => setRole(e.target.value)}
  //                   id="category"
  //                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  //                   required
  //                 >
  //                   <option>student</option>
  //                   <option>teacher</option>
  //                 </select>
  //               </div>
  //             </div>
  //             {error && <div className="text-s text-red-500"> {error} </div>}
  //             <div class="flex items-center">
  //               <input
  //                 id="link-checkbox"
  //                 type="checkbox"
  //                 value={tc}
  //                 onChange={(e)=>setTc(e.target.value)}
  //                 class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  //               />
  //               <label
  //                 for="link-checkbox"
  //                 class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  //               >
  //                 I agree with the{" "}
  //                 <a
  //                   href="#"
  //                   class="text-blue-600 dark:text-blue-500 hover:underline"
  //                 >
  //                   terms and conditions
  //                 </a>
  //                 .
  //               </label>
  //             </div>
  //             <div>
  //               <button
  //                 type="button"
  //                 onClick={() => {
  //                   handleUserRegister();
  //                 }}
  //                 className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-400"
  //               >
  //                 Create Account <ArrowRight className="ml-2" size={16} />
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <div className="min-h-screen ">
      <div>
        <section class="min-h-screen  bg-gray-50 bg-gradient-to-t from-gray-700 to-black">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form class="space-y-4 md:space-y-6">
                  <div>
                    <label
                      for="text"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name "
                      required=""
                    />
                  </div>
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
                      for="phone"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone No.
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone"
                      id="phone"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="mobile no."
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
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="confirm-password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="confirm-password"
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="terms"
                        class="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleUserRegister(e)}
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <Link to="/login">
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="#"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </a>
                    </p>
                  </Link>
                  <p className="text-red-500">{error ? error : ""}</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
