import React, { useState, useEffect } from "react";
import { FaUserShield, FaIdCardAlt } from "react-icons/fa";
import BASE_URL from "../../../../components/Shared/baseurl";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const updateRole = (userId, role, userName) => {
    fetch(`${BASE_URL}/user/role/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              return {
                ...user,
                role: role,
              };
            }
            return user;
          });
          setUsers(updatedUsers);
          Swal.fire({
            icon: "success",
            title: `${role}`,
            text: `${userName} is now an ${role}.`,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update user role.",
        });
      });
  };

  const makeAdmin = (userId, userName) => {
    updateRole(userId, "admin", userName);
  };

  const makeDriver = (userId, userName) => {
    updateRole(userId, "driver", userName);
  };

  return (
    <div>
      <h2 className="my-10 text-center text-3xl font-bold border-b-2 pb-3">
        All Users - {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-4/5 mx-auto font-bold">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="flex gap-2 justify-center items-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover">
                <td>{user.name ? user.name : user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2 justify-center items-center">
                  {user.role === "admin" ? (
                    <span className="text-green-600">Admin</span>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user._id, user?.name)}
                      title="Make Admin"
                      className="text-green-600 bg-gray-200 text-2xl p-2 rounded-full cursor-pointer"
                    >
                      <FaUserShield />
                    </button>
                  )}
                  {user.role === "driver" ? (
                    <span className="text-green-600">Driver</span>
                  ) : (
                    <div className="flex gap-4 justify-center items-center">
                      <button
                        onClick={() => makeDriver(user._id, user?.name)}
                        title="Make Driver"
                        className="text-green-600 bg-gray-200 text-2xl p-2 rounded-full cursor-pointer"
                      >
                        <FaIdCardAlt />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
