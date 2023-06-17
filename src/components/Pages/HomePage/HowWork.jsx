import React, { useEffect, useState } from "react";
import SectionHeader from "../../Shared/SectionHeader";
import HowWorkCard from "./HowWorkCard";

const HowWork = () => {
  const [howWork, setHowWork] = useState([]);

  useEffect(() => {
    fetch("/howWork.json")
      .then((res) => res.json())
      .then((data) => setHowWork(data));
  }, []);

  return (
    <>
      <div className="md:py-20">
        <SectionHeader
          heading="How It Works"
          subheading="Let's know how it works"
        />
        <div className="container md:p-0 p-8 mx-auto grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {howWork.length > 0 ? (
            howWork.map((work) => (
              <HowWorkCard
                key={work.id}
                icon={work.icon}
                subheading={work.subheading}
                heading={work.heading}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HowWork;
