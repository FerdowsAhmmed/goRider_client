import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../components/Shared/baseurl";
import Swal from "sweetalert2";

const PendingRides = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/pending-ride`)
      .then((res) => res.json())
      .then((data) => setCarData(data));
  }, []);

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
              setCarData((prevCarData) =>
                prevCarData.filter((car) => car._id !== id)
              );
            } else {
              console.log("Failed to delete document");
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
            <Link to={'/ride'} className="text-blue-500 underline">Take A Ride</Link>
        </div>
      ) : (
        <div>
          <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {carData.map((car) => {
              return (
                <div className="bg-gray-100 p-3 rounded-md">
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
                  <h4 className="text-lg">Price: ${car.totalPrice}</h4>
                  <h4 className="text-lg">
                    Distance: {car.distance}
                    <small>km</small>{" "}
                  </h4>
                  <p className="text-lg bg-success inline px-3 rounded-md py-1">
                    {car.status}
                  </p>
                  <br />
                  {car.status === "pending" ? (
                    ""
                  ) : (
                    <Link
                      to={"/payment"}
                      state={car}
                      className="bg-primary my-3 inline-block px-3 py-1 text-lime-50 rounded-md"
                    >
                      Payment
                    </Link>
                  )}
                  {car.status === "pending" ? (
                    <button
                      className="bg-primary my-3 inline-block px-3 py-1 text-lime-50 rounded-md"
                      onClick={() => handelDeleteRide(car._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
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
