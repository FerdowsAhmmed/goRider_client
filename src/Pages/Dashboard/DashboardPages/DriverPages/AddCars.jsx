import { useContext } from "react";
import { FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";

const AddCars = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${BASE_URL}/cars`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        Swal.fire("Success", "Added A Car Successfully", "success");
        form.reset();
      } else {
        Swal.fire("Error", "Failed to add a car", "error");
      }
    } catch (error) {
      console.error("Error adding car data:", error);
      Swal.fire("Error", "Internal Server Error", "error");
    }
  };

  return (
    <div>
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vehicleType" className="form-label">
            Vehicle Type
          </label>
          <select className="select select-accent w-full" id="vehicleType" name="vehicleType">
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
          />
        </div>

        <button
          type="submit"
          className="btn bg-primary text-secondary hover:text-gray-600"
        >
          Add A Car <FaCar />
        </button>
      </form>
    </div>
  );
};

export default AddCars;
