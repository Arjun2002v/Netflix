import React from "react";
import { useLocation } from "react-router-dom";

const Home = ({ usings }) => {
  const location = useLocation();
  const user = location.state?.user; // Access the user data passed from Login

  return (
    <>
      <>
        {user ? (
          <>
            <div>{user}</div>
          </>
        ) : (
          <>
            <h2>Nigg</h2>
          </>
        )}
      </>
    </>
  );
};

export default Home;
