import React from "react";
import LazyLoad from "react-lazyload";

const Header = () => {
  return (
    <header className="bg-secondary text-light min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-4 ">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="md:text-left text-center">
              <h1 className="text-2xl md:text-5xl text-primary font-bold mb-2">
                Your Ultimate <br /> Ride-Sharing Solution
              </h1>
              <p className="text-md md:text-lg text-tertiary mb-4">
                Experience the Future of Transportation with RideOn: Reliable,
                Convenient, and Eco-Friendly Rides
              </p>
              <button className="bg-primary text-light px-6 py-3 rounded-md font-bold">
                Book Now
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 my-10 md:my-0 order-1 md:order-2">
            <LazyLoad offset={100}>
              <img
                src="https://i.ibb.co/xg51k0Z/go-ride-car-image.png"
                alt="Header Image"
                className="mx-auto"
                loading="lazy"
              />
            </LazyLoad>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
