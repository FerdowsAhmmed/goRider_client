import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Animation_Dim_Light.css";
import TopNavTransparent from "../components/Shared/TopNavTransparent";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import BASE_URL from "../components/Shared/baseurl";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Create User
  const { createUser, googleSignIn } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    let error = "";

    // Check for minimum length
    if (password.length < 6) {
      error = "Password must be at least 6 characters long";
    }
    // Check for uppercase letter
    else if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter";
    }
    // Check for special character
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      error = "Password must contain at least one special character";
    }

    setPasswordError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, displayName, photoUrl);

      const saveUser = { name: displayName, email, photoUrl };

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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${
              error.message === "Firebase: Error (auth/email-already-in-use)."
                ? "Email Already In Use"
                : error.message
            }`,
            footer: "Please Enter Correct User ID And Password",
          }).then(() => {
            navigate("/login");
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

   // Google Signup
   const handleGoogleSignup = async () => {
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
      console.error("Error signing up with Google:", error);
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
        <div className="max-w-md w-full bg-white rounded-lg bg-opacity-40 shadow-lg p-6 relative my-[20vh]">
          <h2 className="text-2xl font-semibold mb-6">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="displayName"
                className="block text-gray-700 font-bold"
              >
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                className="mt-1 p-2 border-none outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                value={displayName}
                onChange={handleDisplayNameChange}
                required
              />
            </div>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-2 border-none outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <div
                  className="absolute top-2 right-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="photoUrl"
                className="block text-gray-700 font-bold"
              >
                PhotoUrl
              </label>
              <input
                type="url"
                id="photoUrl"
                className="mt-1 p-2 border-none outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                value={photoUrl}
                onChange={handlePhotoUrlChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Sign up
            </button>
          </form>
          <div className="flex items-center justify-center mt-6">
            <span className="mr-2">Or sign up with</span>
            <button onClick={handleGoogleSignup} className="flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              <FaGoogle className="mr-2" /> Google
            </button>
          </div>
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-semibold hover:text-yellow-600"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
