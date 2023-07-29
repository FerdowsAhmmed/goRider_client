import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const PendingTours = () => {
  const { user } = useContext(AuthContext);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/pending-ride`)
      .then((res) => res.json())
      .then((data) => setCarData(data));
  }, []);

  // updateRide function to update ride status on both frontend and backend
  const updateRide = (car, status, totalPrice) => {
    const carId = car._id;

    const updateData = {
      status: status,
      totalPrice: totalPrice,
    };

    fetch(`${BASE_URL}/pending-ride/${carId}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update the ride status and total price on the frontend
          setCarData((prevCarData) =>
            prevCarData.map((car) =>
              car._id === carId
                ? { ...car, status: status, totalPrice: totalPrice }
                : car
            )
          );

          // Show success message
          Swal.fire({
            icon: "success",
            title: `${status}`,
            text: "You have taken a ride successfully.",
          });
        } else {
          // Handle failure, such as showing an error message
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update ride status.",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating ride status:", error);
        // Handle error, such as showing an error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update ride status.",
        });
      });
  };

  const handelTakeRide = (car) => {
    updateRide(car, "approved", car.totalPrice);
  };

  return (
    <>
      {carData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <h1 className="text-2xl">You Have No Pending Ride</h1>
          <Link
            to={"/dashboard/driver/home"}
            className="text-blue-500 underline"
          >
            Go to Home Dashboard
          </Link>
        </div>
      ) : (
        <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carData.map((car) => {
            return (
              <div className="h-80 bg-gray-100 w-full" key={car._id}>
                <img
                  src={car.car.vehicleImage}
                  alt={car.car.vehicleName}
                  className="w-full h-full object-cover"
                />
                <h3 className="my-4 text-2xl font-bold uppercase">
                  {car.car.carName}
                </h3>
                <h4 className="text-lg">Vehicle Type: {car.car.vehicleType}</h4>
                <h4 className="text-lg">Seats: {car.car.seats}</h4>
                <h4 className="text-lg">Price: ${car.totalPrice}</h4>
                <h4 className="text-lg">
                  Distance: {car.distance}
                  <small>km</small>{" "}
                </h4>
                <p className="text-lg bg-success inline px-3 rounded-md py-1">
                  {car.status}
                </p>
                <button
                  onClick={() => handelTakeRide(car)}
                  className="text-lg bg-secondary inline px-3 rounded-md py-1 mx-3"
                >
                  Take This Ride
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PendingTours;
