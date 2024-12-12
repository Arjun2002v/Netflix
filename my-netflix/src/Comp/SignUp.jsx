import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Comprehensive Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }

    try {
      // Attempt to create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Log successful user creation
      console.log("User created successfully:", {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      // Redirect to home page
      navigate("/home");
    } catch (error) {
      // Detailed error logging
      console.error("Full Signup Error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      // Specific error handling
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "Email is already registered. Please use a different email."
          );
          break;
        case "auth/invalid-email":
          setError("Invalid email address format");
          break;
        case "auth/operation-not-allowed":
          setError("Email/password accounts are not enabled");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;
        default:
          setError(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-red-500 ml-2 cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
