import React from "react";
import SectionHeader from "../../Shared/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { FaUser, FaQuoteRight, FaQuoteLeft } from "react-icons/fa";

const CustomerReviews = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      comment: "Great service! Highly recommended.",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "The drivers are always punctual and courteous.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      comment: "Affordable prices and comfortable rides.",
    },
    {
      id: 4,
      name: "Mike Johnson",
      comment: "Affordable prices and comfortable rides.",
    },
    {
      id: 5,
      name: "Mike Johnson",
      comment: "Affordable prices and comfortable rides.",
    },
    // Add more objects as needed
  ];

  return (
    <div  className="mb-20">
      <SectionHeader
        heading={"Customer Reviews"}
        subheading={
          "To provide some insights from customers, we present Customer Reviews."
        }
      />
      <div>
        <section
          className="relative py-20"
          style={{
            backgroundImage: `url(https://e0.pxfuel.com/wallpapers/28/560/desktop-wallpaper-route-66-road-map.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <Swiper
            watchSlidesProgress={true}
            slidesPerView={1}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {data.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-secondary bg-opacity-60 mx-5 p-5 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="mr-2">
                      <FaUser size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">
                      {review.name}
                    </h3>
                  </div>
                  <div className="flex justify-start mt-2">
                    <FaQuoteLeft size={18} className="text-primary" />
                  </div>
                  <p className="text-lg">{review.comment}</p>
                  <div className="flex justify-end mt-2">
                    <FaQuoteRight size={18} className="text-primary" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export default CustomerReviews;
