import React from "react";
import { IconContext } from "react-icons";
import { FaBicycle, FaMotorcycle, FaCar, FaBus } from "react-icons/fa";

const HowWorkCard = ({ icon, subheading, heading }) => {
  const getIcon = () => {
    switch (icon) {
      case "FaBicycle":
        return <FaBicycle />;
      case "FaMotorcycle":
        return <FaMotorcycle />;
      case "FaCar":
        return <FaCar />;
      case "FaBus":
        return <FaBus />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="card shadow-xl bg-light">
        <figure className="card-imag bg-tertiary text-light py-5">
          <IconContext.Provider value={{ size: "3rem" }}>
            {getIcon()}
          </IconContext.Provider>
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold text-primary text-center">{subheading}</h2>
          <p className="text-tertiary text-center">{heading}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWorkCard;
