import React, {useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import SocialLogin from "../Register/SocialLogin";
import Swal from "sweetalert2";
import { ReTitle } from "re-title";

const Login = () => {
  const { signIn, resetPassword } = useAuth();
  const location = useLocation();
//   console.log(location);
  const navigate = useNavigate();
  const[showPassword, setShowPassword] = useState(false)
  const {register,handleSubmit,formState: { errors }, getValues} = useForm();
//   const emailRef = useRef();
  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
   const handleForgetPassword =() =>{
        const email = getValues("email");
        console.log(email)
        resetPassword(email)
        .then(()=>{
            Swal.fire(`Password Reset Mail is sent to  Email: ${email}`);
        })
        .catch(error=>{
            Swal.fire(`${error.message}`);
        })
    }
  return (
    
    <div className="max-w-lg mx-auto shadow-md p-5">
    <ReTitle title="Medion|Login" />
    <h1 className="text-5xl font-bold pb-5">Log Into Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            // ref={emailRef}
            type="email"
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <div className="join">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]){8,}/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="btn join-item"
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must be 6 characters, minimum 1 capital,1 number,1 Small
              letter and a special character(@$!%*?&)
            </p>
          )}
          <div>
            <button 
            onClick={handleForgetPassword}
            className="link link-hover text-red-600 mt-2">Forgot password?</button>
          </div>
          <button className="btn btn-primary text-black mt-4">Login</button>
        </fieldset>
        <p>
          <small>
            Yet Have No Account!
            <span className="btn btn-link btn-success hover:text-red-700">
              <Link state={location.state} to="/register">
                Register Now
              </Link>
            </span>
          </small>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
