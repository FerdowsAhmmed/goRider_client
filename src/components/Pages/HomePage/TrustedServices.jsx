import React from "react";
import SectionHeader from "../../Shared/SectionHeader";
import { FaCheck } from "react-icons/fa";

const TrustedServices = () => {
  return (
    <div className="my-10">
      <SectionHeader
        heading={"Trusted Cab"}
        subheading={"Trusted Cab Services in the World"}
      />
      <div className="text-light flex">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="md:text-left text-center">
                <p className="text-md md:text-lg text-tertiary mb-4">
                  Explore the best cab services worldwide. Enjoy reliable
                  transportation, professional drivers, and exceptional customer
                  service. Discover convenience and peace of mind for your
                  travel experiences.
                </p>
                <ul className="list-disc py-6 pl-6">
                  <li className="flex text-primary items-center mb-3">
                    <div className="bg-gray-300 p-1 rounded-full h-5 w-5 mr-2 flex justify-center items-center">
                      <FaCheck className="text-primary" />
                    </div>
                    Cras justo odio
                  </li>
                  <li className="flex text-primary items-center mb-3">
                    <div className="bg-gray-300 p-1 rounded-full h-5 w-5 mr-2 flex justify-center items-center">
                      <FaCheck className="text-primary" />
                    </div>
                    Dapibus ac facilisis in
                  </li>
                  <li className="flex text-primary items-center mb-3">
                    <div className="bg-gray-300 p-1 rounded-full h-5 w-5 mr-2 flex justify-center items-center">
                      <FaCheck className="text-primary" />
                    </div>
                    Morbi leo risus
                  </li>
                </ul>
                <button className="bg-primary text-light px-6 py-3 rounded-full font-bold">
                  READ MORE
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 my-10 md:my-0 order-1 md:order-2">
              <img
                src="https://static.vecteezy.com/system/resources/previews/013/923/535/original/sports-car-logo-png.png"
                alt="Header Image"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedServices;
