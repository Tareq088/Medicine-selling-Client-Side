import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "./Slider.css";


const Discount = () => {
  const axiosSecure = useAxiosSecure();

  const { data: discountedMedicines = [], isLoading } = useQuery({
    queryKey: ["discountedMedicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines/discounted");
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="my-8 px-4 bg-base-200">
      <h2 className="sm:text-lg md:text-2xl lg:text-4xl font-extrabold py-4 text-center text-red-700">Discounted Products</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {discountedMedicines.map(med => (
          <SwiperSlide key={med._id}>
            <div className="card bg-amber-50 shadow-lg p-4 hover:scale-105 transition-transform rounded-xl">
              <img src={med.image} alt={med.itemName} className="w-full h-40 object-cover mb-3 rounded" />
              <h3 className="text-lg font-semibold">Name :  {med.itemName}</h3>
              <p className="text-sm text-gray-600">Generic Name : {med.genericName}</p>
              <p className="text-sm text-gray-500">Company : {med.company}</p>
              <div className="mt-2">
                <p>Price: ৳{med.price}</p>
                <p className="text-green-600 font-bold">Discount: {med.discount}%</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Discount;
