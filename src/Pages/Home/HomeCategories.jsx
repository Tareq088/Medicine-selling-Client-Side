
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading/Loading";


const HomeCategories = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    }
  });
                // console.log(categories)
  if (isLoading) return <Loading></Loading>;

  const handleNavigate = (categoryName) => {
    navigate(`/dashboard/categoryDetailsMedicine/${categoryName}`);
  };

  return (
    <div className="px-4 bg-cyan-50 py-5">
      <h2 className="text-4xl font-extrabold my-10 text-center text-red-700">Explore Medicine Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.slice(7, 13).map(category => (
          <div
            key={category._id}
            onClick={() => handleNavigate(category.categoryName)}
            className="cursor-pointer rounded-xl shadow-md p-4 bg-gray-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg "
          >
            <img
              src={category.categoryImage}
              alt={category.categoryName}
              className="w-full h-40 object-cover rounded-md mb-3 transition-transform duration-300 hover:scale-110"
            />
            <h3 className="text-lg font-semibold">{category.categoryName}</h3>
            <p className="text-gray-600">Items: {category.medicineCount || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
