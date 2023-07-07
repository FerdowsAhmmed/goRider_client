import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import BASE_URL from "../../../../components/Shared/baseurl";
import Swal from "sweetalert2";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  //   Fetch All Data
  useEffect(() => {
    fetch(`${BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  //   Edit Function
  const handleEdit = (car) => {
    setSelectedCar(car);
    window.my_modal_1.showModal();
  };

  //   Update Function
  const handleUpdate = () => {
    if (!selectedCar) {
      return;
    }

    const { _id, ePrice, status, ...otherFields } = selectedCar;

    const updatedCarData = {
      ePrice: parseFloat(document.getElementById("ePrice").value),
      status: document.getElementById("status").value,
      ...otherFields,
    };

    fetch(`${BASE_URL}/cars/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCarData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Good job!", "Car Update Successfully!", "success");
          setCars((prevCars) => {
            const updatedCars = prevCars.map((car) => {
              if (car._id === _id) {
                return {
                  ...car,
                  ePrice: updatedCarData.ePrice,
                  status: updatedCarData.status,
                };
              }
              return car;
            });
            return updatedCars;
          });
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

    // Close the modal
    window.my_modal_1.close();
  };

  //   delete car
  const handleDelete = (car) => {
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
        // Send a DELETE request to delete the car
        fetch(`${BASE_URL}/cars/${car._id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                Swal.fire(
                    'Done!',
                    'Car Delete Successfully!',
                    'success'
                  )
              // Refresh the car list
              fetch(`${BASE_URL}/cars`)
                .then((response) => response.json())
                .then((data) => setCars(data))
                .catch((error) => console.error("Error fetching cars:", error));
            } else {
              // Failed to delete the car
              console.error("Error deleting car:", data.error);
            }
          })
          .catch((error) => console.error("Error deleting car:", error));
      }
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">All Cars</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Image</th>
            <th className="border-b px-4 py-2">Car Name</th>
            <th className="border-b px-4 py-2">Vehicle Type</th>
            <th className="border-b px-4 py-2">Driver Name</th>
            <th className="border-b px-4 py-2">Seats</th>
            <th className="border-b px-4 py-2">Price/km</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="text-center">
              <td className="border-b px-4 py-2">
                <LazyLoad offset={100}>
                  <img
                    src={car.vehicleImage}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </LazyLoad>
              </td>
              <td className="border-b px-4 py-2">{car.carName}</td>
              <td className="border-b px-4 py-2">{car.vehicleType}</td>
              <td className="border-b px-4 py-2">{car.driverName}</td>
              <td className="border-b px-4 py-2">{car.seats}</td>
              <td className="border-b px-4 py-2">{car.ePrice}</td>
              <td className="border-b px-4 py-2">{car.status}</td>
              <td className="border-b px-4 py-2 text-success">
                <div className="flex item-center justify-center gap-3">
                  <button onClick={() => handleEdit(car)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(car)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          {/* Render the selected car data in the modal */}
          {selectedCar && (
            <>
              <h3 className="font-bold text-lg">{selectedCar.carName}</h3>
              <form>
                <label htmlFor="ePrice">Estimated Price</label>
                <input
                  type="number"
                  id="ePrice"
                  name="ePrice"
                  placeholder="Type here"
                  className="input input-bordered input-accent w-full"
                  value={selectedCar.ePrice}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, ePrice: e.target.value })
                  }
                />

                <label htmlFor="status">Status</label>
                <select
                  className="select select-accent w-full"
                  id="status"
                  name="status"
                >
                  <option>approved</option>
                  <option>deny</option>
                  <option disabled selected>
                    pending
                  </option>
                </select>
              </form>
            </>
          )}
          <div className="modal-action">
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AllCars;
