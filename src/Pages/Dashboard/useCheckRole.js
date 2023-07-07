import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../components/Shared/baseurl";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckRole = () => {
  const { user, loading } = useContext(AuthContext);

  console.log(user)

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        const adminUser = data.find((user) => user.role === "admin");
        console.log("adminUser", adminUser)
        const adminDriver = data.find((user) => user.role === "driver");
        if (user.email === adminUser.email) {
            setIsAdmin(true)
        }
        if (user.email === adminDriver.email) {
          setIsDriver(true)
        }
      });
  }, []);

  return [isAdmin, isDriver];
};
export default CheckRole;
