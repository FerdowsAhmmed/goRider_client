import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";
import "./Animation_Dim_Light.css";
import TopNavTransparent from "../components/Shared/TopNavTransparent";
import Swal from "sweetalert2";
import BASE_URL from "../components/Shared/baseurl";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate);
      Swal.fire("Good job!", "Logged in successful!", "success");
      setEmail("");
      setPassword("");
      // Redirect
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${
          error.message === "Firebase: Error (auth/user-not-found)."
            ? "User Not Found"
            : error.message
        }`,
        footer: "Please Enter Correct User ID And Password",
      });
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();

      // Access the user's name and email from the Google sign-in result
      const { displayName, email, photoURL } = result.user;

       // Save the user's name and email to the server or wherever necessary
       const saveUser = { name: displayName, email, photoUrl:photoURL };

       // Send user data to the server
       fetch(`${BASE_URL}/users`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(saveUser),
       })
         .then((res) => res.json())
         .then((data) => {
           Swal.fire({
             title: "Success!",
             text: "User created successfully.",
             icon: "success",
             confirmButtonText: "OK",
           }).then(() => {
             navigate("/"); 
           });
         })
         .catch((error) => {
           console.error("Error sending user data to server:", error);
         });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        footer: "Please Enter Correct User ID And Password",
      });
    }
  };

  return (
    <>
      <TopNavTransparent />
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: "url('https://i.ibb.co/8rRRDb6/483053.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="overlay_animation absolute inset-0 w-full h-full bg-gray-900 backdrop-filter backdrop-blur"></div>
        <div className="max-w-md w-full bg-white rounded-lg bg-opacity-40 shadow-lg p-6 relative">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border-none outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border-none outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center mt-6">
            <span className="mr-2">Or login with</span>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaGoogle className="mr-2" /> Google
            </button>
          </div>
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-500 font-semibold hover:text-yellow-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
