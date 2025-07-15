import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


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
    <div className="my-8 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">Discounted Products</h2>

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
            <div className="card bg-base-100 shadow-lg p-4 hover:scale-105 transition-transform">
              <img src={med.image} alt={med.itemName} className="w-full h-40 object-cover mb-3 rounded" />
              <h3 className="text-lg font-semibold">Name: {med.itemName}</h3>
              <p className="text-sm text-gray-600">Generic Name:{med.genericName}</p>
              <p className="text-sm text-gray-500">Company: {med.company}</p>
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
