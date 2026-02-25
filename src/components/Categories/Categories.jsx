// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { categories } from "../../data/categories";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Card from "./Card";


const Categories = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Tuition <span className="text-blue-600">Categories</span></h1>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {categories.map((item) => (
          <SwiperSlide
            key={item.title}
            className="w-72! sm:w-80! md:w-96! lg:w-88!"
          >
            <Card title={item.title} image={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Categories;
