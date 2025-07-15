import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { imagUploadURl } from "../../../API/Utlities";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";
import { ReTitle } from "re-title";


const AskForAdvertisement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      // Upload image and get URL
      const imageFile = data.medicineImage[0];
      const imageUrl = await imagUploadURl(imageFile);

      const adData = {
        medicineImage: imageUrl,
        description: data.description,
        sellerEmail: user?.email,
        sellerName: user?.displayName,
        sellerImage: user?.photoURL,
        addStatus: "pending",
        createdAt: new Date(),
      };
      console.log(adData)
      const res = await axiosSecure.post("/advertisements", adData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Advertisement request sent for approval");
      reset();
      setIsModalOpen(false);
      queryClient.invalidateQueries(["advertisements"]);
    },
    onError: () => {  
      toast.error("Failed to request advertisement");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
   // Query to load seller's advertisements
  const { data: myAds = [], isLoading } = useQuery({
    queryKey: ["myAdvertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements?sellerEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  return (
    <div className="p-4">
       <ReTitle title='Medion|Ask For Add'></ReTitle>
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Advertisement Requests</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary text-black block mx-auto my-5"
      >
        Add Advertisement
      </button>
        {isLoading ? (
            <Loading></Loading>
            ) : (
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                <thead>
                    <tr>
                    <th>SL No.</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Requested At</th>
                    </tr>
                </thead>
                <tbody>
                    {myAds.map((ad,index) => (
                    <tr key={ad._id}>
                        <td>{index+1}</td>
                        <td><img src={ad.medicineImage} alt="Ad" className="w-16 h-16 object-cover" /></td>
                        <td>{ad.description}</td>
                        <td>
                        <span className={`badge ${ad.addStatus === 'added' ? 'badge-success' : 'badge-warning'}`}>
                            {ad.addStatus}
                        </span>
                        </td>
                        <td>{new Date(ad.createdAt).toLocaleString()}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Request for Advertisement</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                type="file"
                {...register("medicineImage", { required: true })}
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
                            {/* name */}
              <input
                type="name"
                {...register("medicineName", { required: true })}
                className="file-input file-input-bordered w-full px-2"
                placeholder="Medicine Name"
              />
                        {/* description */}
              <textarea
                {...register("description", { required: true })}
                placeholder="Advertisement Description"
                className="textarea textarea-bordered w-full"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary text-black" disabled={mutation.isPending}>
                  {mutation.isPending ? "Submitting..." : "Submit"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AskForAdvertisement;
