import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";

const AllToursDriver = () => {
  const { user } = useContext(AuthContext);
  const [myTour, setMyTour] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/payment`)
      .then((res) => res.json())
      .then((data) => {
        const driverTours = data.filter(
          (tour) => tour.driverEmail === user?.email
        );
        setMyTour(driverTours);
      });
  }, []);

  return (
    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {myTour.map((ride) => {
        return (
          <>
            <div className="bg-gray-100 w-full p-5 rounded-md">
              <h3 className="my-4 text-2xl font-bold uppercase">
                {ride.carName}
              </h3>
              <h4 className="text-md my-2 border-b-2 overflow-hidden">Vehicle Type:{ride.vehicleType}</h4>
              <h4 className="text-md my-2 border-b-2 overflow-hidden">Driver Name:{ride.vehicleType}</h4>
              <h4 className="text-md my-2 border-b-2 overflow-hidden">Price: ${ride.price}</h4>
              <h4 className="text-md my-2 border-b-2 overflow-hidden">Transaction Id: ${ride.transactionId}</h4>
              <h4 className="text-md my-2 border-b-2 overflow-hidden">
                Distance: {ride.distance}
                <small>km</small>
              </h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AllToursDriver;
