import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const Slider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['slider'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertisements?status=added');
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide._id}>
            <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
              <img src={slide.medicineImage} alt="Slide" className="w-full h-96 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-bold">{slide.description}</h3>
                <p className="text-sm mt-1">By: {slide.sellerName} ({slide.sellerEmail})</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
