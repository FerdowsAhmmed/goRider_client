import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/Shared/TopNavBar";
import Footer from "../components/Shared/Footer";
import MapBoxComponent from "../components/MapBoxComponent";

const RidePage = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirm-ride", {
      state: { originData, destinationData },
    });
  };

  const handlePickupChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleOriginDataLogged = (data) => {
    // console.log(data.coordinates);
    setOriginData(data);
  };

  const handleDestinationDataLogged = (data) => {
    // console.log(data.coordinates);
    setDestinationData(data);
  };

  return (
    <>
      <TopNav />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-screen">
        <div className="col-span-1 md:col-span-1 lg:col-span-1 bg-gray-200 shadow-xl my-10 mx-5 rounded-md p-3 h-fit">
          <h2 className="text-2xl">Set Destination</h2>
          <form onSubmit={handleSubmit}>
            <input
              required={true}
              type="text"
              placeholder="Pickup Location"
              value={originData?.placeName}
              onChange={handlePickupChange}
              className="input input-bordered input-success w-full max-w-xs my-2"
              disabled
            />
            <input
              required={true}
              type="text"
              placeholder="Where To?"
              value={destinationData?.placeName}
              onChange={handleDestinationChange}
              className="input input-bordered input-success w-full max-w-xs my-2"
              disabled
            />
            <button type="submit" className="btn btn-active btn-neutral w-full">
              Confirm Location
            </button>
          </form>
        </div>
        <div className="bg-gray-500 col-span-1 md:col-span-2 lg:col-span-3">
          <MapBoxComponent
            onOriginLogged={handleOriginDataLogged}
            onDestinationLogged={handleDestinationDataLogged}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RidePage;
