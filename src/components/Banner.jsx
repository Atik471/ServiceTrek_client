import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const images = [
    "/assets/banner_1.jpg",
    "/assets/banner_2.jpg",
    "/assets/banner_3.jpg",
  ];

  const bannerText = [
    <>
      <h1 className="text-white text-4xl font-bold">Elevate Your Career to New Heights!</h1>
      <p className="text-white text-xl font-bold">Unlock opportunities with expert guidance, professional training, and a network that empowers your success.</p>
    </>,
    <>
      <h1 className="text-white text-4xl font-bold">Redefining Excellence in Services!</h1>
      <p className="text-white text-xl font-bold">Experience top-notch solutions tailored to meet your needs—because your satisfaction drives us.</p>
    </>,
    <>
      <h1 className="text-white text-4xl font-bold">Build Skills, Achieve Dreams!</h1>
      <p className="text-white text-xl font-bold">Learn, grow, and transform with industry-leading training and resources designed for your future.</p>
    </>,
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full h-[90vh] flex items-center"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col  gap-4 items-center justify-center font-mono">
                {bannerText[index]}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
