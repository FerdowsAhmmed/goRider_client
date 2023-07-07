import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";

const MyRides = () => {
  const {user} = useContext(AuthContext)
  const [myRide, setMyRide] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/payment`)
      .then((res) => res.json())
      .then((data) => {
        const driverRider = data.filter(
          (rider) => rider.userEmail === user?.email
        );
        setMyRide(driverRider);
      });
  }, []);

  console.log(myRide);

  return (
    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {myRide.map((ride) => {
        return (
          <>
            <div className="bg-gray-100 w-full p-5 rounded-md">
              <h3 className="my-4 text-2xl font-bold uppercase">
                {ride.carName}
              </h3>
              <h4 className="text-md border-b-2">
                Vehicle Type:{ride.vehicleType}
              </h4>
              <h4 className="text-md border-b-2">
                Driver Name:{ride.vehicleType}
              </h4>
              <h4 className="text-md border-b-2">Price: ${ride.price}</h4>
              <h4 className="text-md border-b-2">
                Transaction Id: ${ride.transactionId}
              </h4>
              <h4 className="text-md border-b-2">
                Distance: {ride.distance}
                <small>km</small>{" "}
              </h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default MyRides;
