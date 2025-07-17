import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { imagUploadURl } from '../../API/Utlities';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { toast } from 'react-toastify';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { ReTitle } from 're-title';
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[profilePic, setProfilePic] = useState(null);
    const{setUser, createUser, updateUserProfile} = useAuth();
    const axiosInstance = useAxios();
    const[showPassword, setShowPassword] = useState(false)
 
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
     const handleImageUpload = async(e) => {
        const imageData = e.target.files[0];
        const imageURL = await imagUploadURl(imageData)
        // console.log(imageURL);
        setProfilePic(imageURL)
    }

    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                 console.log(result.user);
                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    role: data.role,
                    name:data.name,
                    image:profilePic,
                    createdAt: new Date().toISOString(),
                    lastLogIn: new Date().toISOString(),
                }
                const userRes = await axiosInstance.post('/users', userInfo);
                // console.log(userRes.data);
                if(userRes.data.insertedId){
                            // update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic,
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        setUser({...userRes.user,...userProfile})
                        toast.success("User is created")
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
   
    return (

        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto">
            <ReTitle title="Medion|Register" />
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input w-full" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        {/* image field */}
                        <label className="label">Your Photo</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="input w-full py-2" placeholder="Your Profile picture" required
                            // {...register("photoURL",{required:true})}
                        />
                        {/* {
                            errors.photoURL?.type === "required" && <p className='text-red-500'>Upload Your Photo</p>
                        } */}

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input w-full" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {/* password field*/}
                        <label className="label">Password</label>
                        <div className="join">
                             <input type={showPassword?"text" :"password"} {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]){8,}/})} 
                             className="input w-full" placeholder="Password" />
                            <button type='button'
                                onClick={()=>{
                                    setShowPassword(!showPassword)
                                    }} className="btn join-item">
                                {showPassword ?
                                <IoIosEyeOff/>
                                :
                                <IoIosEye/>
                                }
                            </button>
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must be 6 characters, minimum 1 capital,1 number,1 Small letter  and a special character(@$!%*?&)</p>
                        }
                                                        {/* select role */}
                        <label className="label">Select Your Role</label>
                          <select {...register("role")} className='select w-full'>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                                
                            </select>
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p>Already have an account?<Link className="btn btn-link text-green-700 hover:text-red-700" to="/login">Login</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;