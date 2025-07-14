import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Switch } from '@headlessui/react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';


const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertisements');
      return res.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      return axiosSecure.patch(`/advertisements/${id}/status`, { newStatus });
    },
    onSuccess: () => {
      toast.success('Advertisement status updated');
      queryClient.invalidateQueries(['advertisements']);
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const handleToggle = (ad) => {
    const newStatus = ad.addStatus === 'added' ? 'pending' : 'added';
    toggleMutation.mutate({ id: ad._id, newStatus });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-6 text-blue-600 text-center">Manage Banners</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Image</th>
              <th>Medicine Info</th>
              <th>Seller Info</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad,index) => (
              <tr key={ad._id}>
                <td>{index+1}</td>
                <td>
                  <img src={ad.medicineImage} alt="medicine" className="h-16 w-16 object-cover rounded" />
                </td>
                <td>{ad.description}</td>
                <td>
                  <p>{ad.sellerName}</p>
                  <p className="text-sm text-gray-500">{ad.sellerEmail}</p>
                </td>
                <td>
                  <span className={`badge ${ad.addStatus === 'added' ? 'badge-success' : 'badge-ghost'}`}>
                    {ad.addStatus}
                  </span>
                </td>
                <td>
                  <Switch
                    checked={ad.addStatus === 'added'}
                    onChange={() => handleToggle(ad)}
                    className={`${
                      ad.addStatus === 'added' ? 'bg-green-500' : 'bg-gray-300'
                    } relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer`}
                  >
                    <span
                      className={`${
                        ad.addStatus === 'added' ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBanner;
