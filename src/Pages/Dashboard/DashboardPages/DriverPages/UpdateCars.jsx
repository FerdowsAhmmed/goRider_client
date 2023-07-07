import React, { useContext, useEffect, useState } from "react";
import { FaArrowCircleRight, FaCar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const UpdateCars = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [allCar, setAllCar] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    carName: "",
    vehicleType: "",
    vehicleImage: "",
    driverName: "",
    driverEmail: "",
    seats: 0,
    ePrice: 0,
  });

  // Fetch All Data
  useEffect(() => {
    fetch(`${BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data) => {
        const approvedCars = data.filter(
          (car) => car.driverEmail === user.email
        );
        setAllCar(approvedCars);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      carName: car.carName,
      vehicleType: car.vehicleType,
      vehicleImage: car.vehicleImage,
      driverName: user.displayName,
      driverEmail: user.email,
      seats: car.seats,
      ePrice: car.ePrice,
    });
  };

  console.log(allCar);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${BASE_URL}/cars/${selectedCar._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Good job!", "Car updated successfully!", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update the car!",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating car:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      });

    // Reset the form
    setFormData({
      carName: "",
      vehicleType: "",
      vehicleImage: "",
      driverName: "",
      driverEmail: "",
      seats: 0,
      ePrice: 0,
    });

    fetch(`${BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data) => {
        const approvedCars = data.filter(
          (car) => car.driverEmail === user.email
        );
        setAllCar(approvedCars);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="m-4 text-2xl">Update Cars</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allCar?.map((car) => {
          return (
            <div key={car._id}>
              <div
                className={`card card-compact w-full ${
                  car.status === "pending" ? "bg-gray-300" : "bg-gray-100"
                } shadow-xl border-2 border-secondary`}
              >
                <figure>
                  <img
                    src={car.vehicleImage}
                    alt={car.carName}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title">{car.carName}</h2>
                  <p className="text-warning">Keep 1 car at a time</p>
                  <ul>
                    <li className="flex gap-3 items-center">
                      <FaArrowCircleRight />
                      Seats: {car.seats}{" "}
                    </li>
                    <li className="flex gap-3 items-center">
                      <FaArrowCircleRight />
                      Price: {car.ePrice}{" "}
                    </li>
                  </ul>
                  <div className="card-actions flex justify-end">
                    <button
                      className="btn bg-info"
                      onClick={() => handleEdit(car)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-danger"
                      //   onClick={() => handleSetInactive(car)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 text-center text-3xl uppercase">Edit Form</h2>

      <form
        onSubmit={handleSubmit}
        className="border-2 p-4 my-10 mx-5 rounded-xl"
      >
        <div className="mb-4">
          <label htmlFor="carName" className="form-label">
            Car Name
          </label>
          <input
            type="text"
            id="carName"
            name="carName"
            className="input input-bordered w-full"
            value={formData.carName}
            onChange={(e) =>
              setFormData({ ...formData, carName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vehicleType" className="form-label">
            Vehicle Type
          </label>
          <select
            className="select select-accent w-full"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={(e) =>
              setFormData({ ...formData, vehicleType: e.target.value })
            }
          >
            <option disabled selected>
              Select vehicle Type
            </option>
            <option>Privet Car</option>
            <option>Jeep</option>
            <option>Van</option>
            <option>Bike</option>
            <option>Microbus</option>
            <option>Minibus</option>
            <option>Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="vehicleImage" className="form-label">
            Vehicle Image
          </label>
          <input
            type="text"
            id="vehicleImage"
            name="vehicleImage"
            className="input input-bordered w-full"
            value={formData.vehicleImage}
            onChange={(e) =>
              setFormData({ ...formData, vehicleImage: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="driverName" className="form-label">
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            className="input input-bordered w-full"
            value={user.displayName}
            name="driverName"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="driverEmail" className="form-label">
            Driver Email
          </label>
          <input
            type="email"
            id="driverEmail"
            className="input input-bordered w-full"
            value={user.email}
            name="driverEmail"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seats" className="form-label">
            Available Seats
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            className="input input-bordered w-full"
            value={formData.seats}
            onChange={(e) =>
              setFormData({ ...formData, seats: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seats" className="form-label">
            Estimated Price/<small>km</small>
          </label>
          <input
            type="number"
            id="ePrice"
            name="ePrice"
            className="input input-bordered w-full"
            value={formData.ePrice}
            onChange={(e) =>
              setFormData({ ...formData, ePrice: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn bg-primary text-secondary hover:text-gray-600"
        >
          Update Car <FaCar />
        </button>
      </form>
    </div>
  );
};

export default UpdateCars;
