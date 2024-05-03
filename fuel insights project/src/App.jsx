import appRouter from "./appRouter.jsx";

import React, { useEffect } from "react";

import { RouterProvider } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice.js";
import { BASE_URL } from "./configs/config.js";
import Navbar from "./components/NavBar.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userSlice.user);

  useEffect(() => {
    const getUserByToken = async () => {
      if (!localStorage.getItem("token")) {
        return dispatch(addUser(null));
      }
      try {
        const response = await fetch(`${BASE_URL}user/get-user-by-token`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        dispatch(addUser(data.data));
      } catch (err) {
        console.log("initial user geting err :  ", err);
        dispatch(addUser(null));
      }
    };
    getUserByToken();
  }, []);

  return (
      <RouterProvider router={appRouter} />
  )
}

export default App;
