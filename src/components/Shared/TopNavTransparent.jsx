import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useCheckRole from "../../Pages/Dashboard/useCheckRole";

const TopNavTransparent = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [isAdmin, isDriver] = useCheckRole();
  const dynamicPath = `${
    isAdmin ? "/dashboard/admin/home" : isDriver ? "/dashboard/driver/home" : ""
  }`;

  const handelLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar fixed z-50 bg-primary bg-opacity-50 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary bg-opacity-50 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/ride"}>Ride</Link>
            </li>
            <li>
              <Link to={"/blog"}>Blogs</Link>
            </li>
            <li>
              {user ? (
                <>
                  <div className="flex items-center">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="text-secondary h-8 w-8 rounded-full mr-1"
                    />
                    <span className="text-white">{user?.displayName}</span>
                  </div>
                  <div className="flex flex-col">
                    <li>
                      <Link to={dynamicPath}>Dashboard</Link>
                    </li>
                    <li>
                      <button
                        className="flex items-center bg-secondary hover:bg-red-300"
                        onClick={handelLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="font-bold w-full text-primary"
                  style={{ backgroundColor: "#FECC18" }}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="ml-10 btn btn-link text-white no-underline hover:no-underline normal-case text-2xl"
        >
          Go-Rider
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex mr-5 lg:items-center">
        <ul className="font-bold p-2 bg-primary bg-opacity-50 rounded-box lg:flex lg:justify-center lg:items-center gap-4">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/ride"}>Ride</Link>
          </li>
          <li>
            <Link to={"/blog"}>Blogs</Link>
          </li>
          <li>
            {user ? (
              <div className="dropdown dropdown-bottom bg-transparent dropdown-end">
                <label tabIndex={0} className="btn bg-primary hover:bg-primary">
                  <div className="flex items-center">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="text-secondary h-8 w-8 rounded-full mr-1"
                    />
                    <span className="text-white">{user?.displayName}</span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[50] menu p-2 shadow bg-primary rounded-box w-52"
                >
                  <li>
                    <Link to={dynamicPath}>Dashboard</Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center bg-secondary hover:bg-red-300"
                      onClick={handelLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-primary"
                style={{ backgroundColor: "#FECC18" }}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavTransparent;
