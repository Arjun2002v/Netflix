import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Comp/Login";
import Home from "./Comp/Home";
import SignUp from "./Comp/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <h1>Nigga u r in the wrong page </h1>,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
