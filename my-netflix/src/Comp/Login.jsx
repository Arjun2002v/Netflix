import React, { useState } from "react";
import { auth, googleProvider } from "../Comp/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect after successful login
    } catch (error) {
      console.error("Error logging in with email:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User is signed in
      console.log("Google Sign-In Success:", result.user);
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Google Sign-In Error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      // More detailed error handling
      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert("Sign-in was cancelled.");
          break;
        case "auth/popup-blocked":
          alert("Sign-in popup was blocked. Please allow popups.");
          break;
        default:
          alert(`Google Sign-In failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <div className="relative overflow-x-hidden ">
        <img
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
          width="250px"
          className="absolute"
        />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg"
          alt=""
        />
        <div className="absolute top-[20%] left-[40%] z-50 bg-black flex justify-center flex-col h-[500px] w-[400px] p-12 gap-7 rounded-lg">
          <h2 className="text-white text-3xl font-bold">Sign In</h2>
          <input
            type="text"
            placeholder="Enter email or number"
            className="p-2 bg-slate-800 text-white rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="p-2 bg-slate-800 rounded-md text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            className="bg-red-600 text-white flex align-middle justify-center font-bold rounded-lg p-3"
          >
            Sign In
          </button>
          <h3 className="text-white font-bold text-xl ml-[135px]">or</h3>
          <button
            onClick={handleGoogleSignIn}
            className="bg-white text-black flex align-middle gap-4 justify-center mr-[0px] font-bold rounded-lg p-3"
          >
            Sign In with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              className="w-[18px] pt-[3px]"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
