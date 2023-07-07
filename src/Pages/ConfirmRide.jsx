import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmMap from "../components/Pages/RidePage/ConfirmMap";
import BASE_URL from "../components/Shared/baseurl";
import Footer from "../components/Shared/Footer";
import TopNav from "../components/Shared/TopNavBar";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

const ConfirmRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originData, destinationData } = location.state;

  // States
  const [carData, setCarData] = useState([]);
  const [availableData, setAvailableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOption, setSortOption] = useState("price");

  const destination = {
    Longitude: destinationData.coordinates[0],
    Latitude: destinationData.coordinates[1],
  };

  const origin = {
    Longitude: originData.coordinates[0],
    Latitude: originData.coordinates[1],
  };

  // distance in kilometers
  function calculateDistance(origin, destination) {
    const earthRadius = 6371;
    const { Longitude: lon1, Latitude: lat1 } = origin;
    const { Longitude: lon2, Latitude: lat2 } = destination;

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return parseFloat(distance.toFixed(2));
  }

  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
  // distance in kilometers
  const distance = calculateDistance(origin, destination);

  // Fetch All Data
  useEffect(() => {
    fetch(`${BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data) => {
        const approvedCars = data.filter(
          (car) => car.status === "approved" && car.activity === "active"
        );
        setCarData(approvedCars);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/pending-ride`)
      .then((response) => response.json())
      .then((data) => {
        setAvailableData([{ data, carData }]);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  // Filter by type
  const filteredCars = carData.filter(
    (car) =>
      car.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery === "See All"
  );
  // Sort by Price
  // Sort by Price
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === "price") {
      const priceComparison = a.ePrice - b.ePrice;
      return sortOrder === "asc" ? priceComparison : -priceComparison;
    }
    return 0;
  });

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const [carInfo, setCarInfo] = useState(null);
  // see Info
  const seeInfo = (car) => {
    const totalPrice = distance * car.ePrice;

    setCarInfo({ car, totalPrice, distance });
    window.my_modal_1.showModal();
  };

  // handelSaveRide
  const handelSaveRide = (car) => {
    const totalPrice = distance * car.ePrice;

    fetch(`${BASE_URL}/pending-ride`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalPrice,
        distance,
        car,
        status: "pending",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          navigate("/dashboard/pending-rides");
        }
        console.log(data, "data");
      });
  };

  return (
    <>
      <TopNav />
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 md:min-h-screen">
        <div className="col-span-1 md:col-span-3 lg:col-span-3 bg-gray-200 shadow-xl my-10 mx-5 rounded-md p-3 h-fit">
          <h2 className="text-2xl">Select Vehicles</h2>
          {/* Search And Filter */}
          <div className="flex gap-2 mt-3">
            <select
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
            >
              <option value="See All">See All</option>
              <option value="Privet Car">Privet Car</option>
              <option value="Jeep">Jeep</option>
              <option value="Van">Van</option>
              <option value="Bike">Bike</option>
              <option value="Microbus">Microbus</option>
              <option value="Minibus">Minibus</option>
              <option value="Others">Others</option>
            </select>

            <button
              className="btn btn-active btn-neutral flex items-center"
              onClick={handleSortToggle}
            >
              Price{" "}
              {sortOrder === "asc" ? (
                <>
                  <span className="hidden md:block"> low to heigh </span>
                  <FaSortAmountDownAlt className="ml-1" />
                </>
              ) : (
                <>
                  <span className="hidden md:block"> heigh to low </span>
                  <FaSortAmountUpAlt className="ml-1" />
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 sm:flex-row sm:justify-between sm:gap-0">
            {sortedCars.length === 0 ? (
              <div>
                <div colSpan="5" className="text-center">
                  No data found
                </div>
              </div>
            ) : (
              sortedCars?.map((car) => {
                const totalPrice = distance * car.ePrice;
                const dataForPayment = {
                  car,
                  totalPrice,
                  distance,
                };
                return (
                  <div
                    key={car._id}
                    className="border-2 border-gray-300 my-5 p-5 rounded-md"
                  >
                    <div className="h-36">
                      <img
                        src={car.vehicleImage}
                        alt={car.vehicleType}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col mt-3">
                      <p className="text-xl">
                        {car.carName}{" "}
                        <span className="text-xs text-gray-500 bg-secondary px-2 rounded-full">
                          {car.vehicleType}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className=" text-tertiary">
                        Distance: {distance} <span className="text-sm">km</span>
                      </p>
                    </div>
                    <div className="text-tertiary">
                      Seats: <span className="text-blue-500">{car.seats}</span>
                    </div>
                    <div className="text-tertiary">
                      Cost:{" "}
                      <span className="text-blue-500">
                        {" "}
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="divider"></div>
                    <div className="pr-3 flex my-3">
                      <button
                        className="bg-warning py-1 rounded-md h-full px-4 mx-3"
                        onClick={() => {
                          seeInfo(car);
                        }}
                      >
                        More Info
                      </button>
                      <button
                        onClick={() => handelSaveRide(car)}
                        className="bg-success py-1 rounded-md h-full px-4 mx-3 text-center"
                      >
                        Confirm Ride
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="col-span-1 min-h-[50vh] md:col-span-2 lg:col-span-2 bg-gray-200 shadow-xl my-10 mx-5 rounded-md p-3 ">
          <ConfirmMap destination={destination} origin={origin} />
        </div>
      </div>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          {/* Render the selected car data in the modal */}
          {carInfo?.car && (
            <>
              <h3 className="font-bold text-lg">
                Car Name: {carInfo.car.carName}
              </h3>
              <div className="flex justify-center">
                <img
                  src={carInfo.car.vehicleImage}
                  alt={carInfo.car.vehicleType}
                />
              </div>
              <ul>
                <li>Seats: {carInfo.car.seats}</li>
                <li>Type: {carInfo.car.vehicleType}</li>
              </ul>
            </>
          )}
          <div className="modal-action">
            <button
              onClick={() => handelSaveRide(carInfo)}
              className="btn bg-success"
            >
              Confirm Ride
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      <Footer />
    </>
  );
};

export default ConfirmRide;
