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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-3">Categories</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Tuition Categories</h2>
      </div>
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
    </section>
  );
};
export default Categories;
