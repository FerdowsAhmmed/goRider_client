import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../components/Shared/baseurl";
import Swal from "sweetalert2";

const PendingRides = () => {
  const [carData, setCarData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    fetchPendingRides();
  }, []);

  const fetchPendingRides = () => {
    fetch(`${BASE_URL}/pending-ride`)
      .then((res) => res.json())
      .then((data) => {
        // Set both the original and updated totalPrice in the state
        setCarData(
          data.map((car) => ({ ...car, originalTotalPrice: car.totalPrice }))
        );
      })
      .catch((error) => {
        console.error("Error fetching pending rides:", error);
        // Handle error, such as showing an error message
      });
  };

  const handleApplyCoupon = (carId) => {
    // Fetch coupon details from the server using the coupon code
    fetch(`${BASE_URL}/coupons?name=${couponCode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setAppliedCoupon(data);
          Swal.fire(
            "Coupon Applied!",
            `Coupon '${data.name}' applied successfully!`,
            "success"
          );

          // Calculate the new price for the specific car
          const carToUpdate = carData.find((car) => car._id === carId);
          if (carToUpdate) {
            const newTotalPrice =
              carToUpdate.originalTotalPrice -
              (carToUpdate.originalTotalPrice * data.discount) / 100;
            updateCarRent(carId, newTotalPrice, "applied", true); // Set isCouponUsed to true
          }
        } else {
          // Coupon with the provided code does not exist
          setAppliedCoupon(null);
          Swal.fire(
            "Invalid Coupon!",
            "Please enter a valid coupon code.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error applying coupon:", error);
        // Handle error, such as showing an error message
      });
  };

  const updateCarRent = (carId, newTotalPrice, status, isCouponUsed) => {
    // Send the updated price, status, and isCouponUsed to the server
    const updateData = {
      totalPrice: newTotalPrice,
      status: status,
      isCouponUsed: isCouponUsed,
    };

    fetch(`${BASE_URL}/pending-ride/${carId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update the car's price, status, and isCouponUsed in the frontend state
          setCarData((prevCarData) =>
            prevCarData.map((car) =>
              car._id === carId
                ? {
                    ...car,
                    totalPrice: newTotalPrice,
                    status: status,
                    isCouponUsed: isCouponUsed,
                  }
                : car
            )
          );
        } else {
          // Handle failure, such as showing an error message
        }
      })
      .catch((error) => {
        console.error("Error updating car rent:", error);
        // Handle error, such as showing an error message
      });
  };

  const handelDeleteRide = (id) => {
    // Show confirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this car.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/pending-ride/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Done!", "Car Delete Successfully!", "success");
              fetchPendingRides(); // Refresh the pending rides after deletion
            } else {
              // Handle failure, such as showing an error message
            }
          })
          .catch((error) => {
            console.error(error);
            // Handle error, such as showing an error message
          });
      }
    });
  };

  return (
    <>
      {carData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <h1 className="text-2xl">You Have No Pending Ride</h1>
          <Link to={"/ride"} className="text-blue-500 underline">
            Take A Ride
          </Link>
        </div>
      ) : (
        <div>
          <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {carData.map((car) => {
              const totalPrice = appliedCoupon
                ? car.originalTotalPrice -
                  (car.originalTotalPrice * appliedCoupon.discount) / 100
                : car.originalTotalPrice;

              return (
                <div key={car._id} className="bg-gray-100 p-3 rounded-md">
                  <img
                    src={car.car.vehicleImage}
                    alt={car.car.vehicleName}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="my-4 text-2xl font-bold uppercase">
                    {car.car.carName}
                  </h3>
                  <h4 className="text-lg">
                    Vehicle Type: {car.car.vehicleType}
                  </h4>
                  <h4 className="text-lg">Seats: {car.car.seats}</h4>
                  <h4 className="text-lg">Price: ${totalPrice}</h4>
                  <h4 className="text-lg">
                    Distance: {car.distance}
                    <small>km</small>{" "}
                  </h4>
                  <p className="text-lg bg-success inline px-3 rounded-md py-1">
                    {car.status}
                  </p>
                  <br />
                  {car.status === "pending" ? (
                    <button
                      className="bg-primary my-3 inline-block px-3 py-1 text-lime-50 rounded-md"
                      onClick={() => handelDeleteRide(car._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <Link
                      to={"/payment"}
                      state={car}
                      className="bg-primary my-3 inline-block px-3 py-1 text-lime-50 rounded-md"
                    >
                      Payment
                    </Link>
                  )}

                  {car.isCouponUsed ? (
                    ""
                  ) : (
                    <div className="collapse bg-base-200">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        Have a coupon code
                      </div>
                      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                        <div className="flex flex-col justify-center items-center gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="input input-bordered"
                            placeholder="Enter coupon code"
                          />
                          <button
                            onClick={() => handleApplyCoupon(car._id)}
                            className="btn btn-primary"
                          >
                            Apply Coupon
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingRides;
