import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";



const AdminHome = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl">
        Welcome
        <span className="text-tertiary font-bold"> {user.displayName} </span>
      </h1>
    </div>
  );
};

export default AdminHome;
