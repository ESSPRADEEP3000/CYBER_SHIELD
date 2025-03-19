// import React, { useState } from "react";
// import { signup } from "../services/authService";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// import { useAuth } from "../context/useAuth"; // Import useAuth

// const Signup = () => {
//   const [name, setName] = useState(""); // New state for name
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login: authLogin } = useAuth(); // Destructure login from useAuth

//   const handleSignup = async (event) => {
//     event.preventDefault(); // Prevent default form submission
//     if (!name || !email || !password) {
//       setError("Name, email, and password are required.");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       const data = await signup({ name, email, password }); // Include name in signup data
//       authLogin(data.token); // Use authLogin to set the token
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Failed to sign up. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
//         <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-sm w-full">
//           <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Signup</h2>
//           {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//           <form onSubmit={handleSignup}>
//             <input
//               type="text"
//               placeholder="User/Organization Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
//               aria-label="Name"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
//               aria-label="Email"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
//               aria-label="Password"
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors duration-300"
//               disabled={loading}
//             >
//               {loading ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;


// Signup.jsx
import React, { useState } from "react";
import { signup } from "../services/authService"; // Assumes you have a signup function
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Import useAuth

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await signup({ name, email, password });
      authLogin(data.token); // Store token on successful signup
      navigate("/dashboard");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Name"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Confirm Password"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
