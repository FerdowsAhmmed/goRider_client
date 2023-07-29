import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../components/Shared/baseurl";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckRole = () => {
  const { user, loading } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        const adminUser = data.filter((user) => user.role === "admin");

        const adminDriver = data.filter((user) => user.role === "driver");

        if (adminUser.some((admin) => admin.email === user.email)) {
          setIsAdmin(true);
        }
        if (adminDriver.some((driver) => driver.email === user.email)) {
          setIsDriver(true);
        }
      });
  }, []);

  return [isAdmin, isDriver];
};

export default CheckRole;
