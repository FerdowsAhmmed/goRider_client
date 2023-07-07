import { useContext, useEffect, useState } from "react";
import BASE_URL from "../../../../components/Shared/baseurl";
import { AuthContext } from "../../../../Providers/AuthProvider";

const DriverHome = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  // Fetch All Data
  useEffect(() => {
    fetch(`${BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data) => {
        const approvedCars = data.filter((car) => car.status === "approved");
        setCars(approvedCars);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleSetActive = (carId) => {
    const updatedCars = cars.map((car) => {
      if (car._id === carId) {
        return {
          ...car,
          activity: "active",
        };
      }
      return car;
    });

    // Save updated data to the database
    saveUpdatedCar(
      carId,
      updatedCars.find((car) => car._id === carId)
    );
  };

  const handleSetInactive = (carId) => {
    const updatedCars = cars.map((car) => {
      if (car._id === carId) {
        return {
          ...car,
          activity: "inactive",
        };
      }
      return car;
    });

    // Save updated data to the database
    saveUpdatedCar(
      carId,
      updatedCars.find((car) => car._id === carId)
    );
  };

  const saveUpdatedCar = async (carId, updatedCar) => {
    try {
      const response = await fetch(`${BASE_URL}/cars/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });
  
      if (response.ok) {
        const updatedCars = cars.map((car) => {
          if (car._id === carId) {
            return updatedCar;
          }
          return car;
        });
  
        setCars(updatedCars);
      } else {
        console.error("Failed to update car:", response);
      }
    } catch (error) {
      console.error("Error saving updated car:", error);
    }
  };
  

  // console.log(cars);

  return (
    <>
      <div className="flex items-center justify-center my-8">
        <h1 className="text-4xl">
          Welcome
          <span className="text-tertiary font-bold"> {user.displayName} </span>
        </h1>
      </div>
      <div className="mx-10">
        <h2 className="text-2xl">Total Cars {cars?.length}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars?.map((car) => {
            const isActive = car.activity === "active";
            const isInactive = car.activity === "inactive";

            return (
              <div key={car._id}>
                <div className="card card-compact w-full h-80 bg-gray-100 shadow-xl border-2 border-secondary">
                  <figure>
                    <img
                      src={car.vehicleImage}
                      alt={car.carName}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{car.carName}</h2>
                    <p className="text-warning">You choose 1 car at a time?</p>
                    <div className="card-actions justify-end">
                      <button
                        className={`btn bg-success ${isActive && "disabled"}`}
                        disabled={isActive}
                        onClick={() => handleSetActive(car._id)}
                      >
                        Active
                      </button>
                      <button
                        className={`btn bg-success ${isInactive && "disabled"}`}
                        disabled={isInactive}
                        onClick={() => handleSetInactive(car._id)}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DriverHome;
