import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
    // baseURL:"http://localhost:3000",
    baseURL:"https://medicine-sellling-e-commerce-server.vercel.app",
})
const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth(); // i can get user data using{user}
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user?.accessToken) {
      // 🛡 Add request interceptor
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      // ❌ Add response interceptor for 401/403
      const responseInterceptor = axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.status === 403) {
            navigate("/forbidden");
          } else if (error.status === 401) {
            logOut()
              .then(() => {
                toast.error(`Logged Out for ${error.status} code`);
                navigate("/login");
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
          console.log("error in interceptor", error);
          return Promise.reject(error);
        }
      );
      // 🧹 Clean up interceptors on unmount or dependency change
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;