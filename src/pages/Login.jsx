import React, { useState,useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {login} from "../../Store/User/UserSlice"
const Login = () => {
  const  [isLogin, setLogin] = useState(true);
  const [showPassword,setShowPassword]=useState(false)
  const [userData,setUserData]=useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isLoggedIn:false
  })
  const navigate= useNavigate()
    const dispatch=useDispatch()
  
    const handleChange=(e)=>{
      setUserData({...userData,[e.target.name]:e.target.value,isLoggedIn:true})
      
    }

useEffect(() => {
 const savedUserData=localStorage.getItem('userData')
 if(savedUserData){
  setUserData(JSON.parse(savedUserData))
 }
}, [])

  const handleLogin=()=>{
    dispatch(login(userData))
     navigate("/profile")
  }
  return (
    <div className='w-full h-screen bg-primary flex items-center justify-center'>
      {
        isLogin?
        <form onSubmit={handleLogin} className='w-4/5 md:w-4/12  flex flex-col gap-2'> 
        <div className='w-full flexCol gap-4'>
           <h1 className='text-4xl '>Login</h1>
           <p className='text-black/70'>Enter Your Email and Password To Login:</p>
        </div>
        <div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
              <input
                type="email"
                name="email"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="email"
                className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
                  userData.email ? '' : '-z-10'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
              >
                E-mail
              </label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex flex-col justify-center ">
              <input
                type={showPassword?"text":"password"}
                name="password"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0  focus:border-black peer"
                placeholder=" "
                required
              />
            <label
        htmlFor="password"
        className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
          userData.password ? '' : '-z-10'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
      >
        Password
      </label>
              <div onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-5 text-lg'>
                {showPassword?
                <FaEye/>
                :
                <FaEyeSlash/>
                }
              </div>
            </div>
            <button className='bg-secondry text-white w-full h-12 text-xl md:text-2xl '>Login</button>
            <div className='flexCenter w-full '>
              <p className='text-black/60'>Don't have an Account? <a 
              onClick={()=>setLogin(false)} className='hover:text-black hover:underline hover:underline-offset-1'>Sign up</a></p>
            </div>
         </form>
        :
        <form onSubmit={handleLogin} className='w-4/5 md:w-4/12 flex flex-col gap-2'> 
        <div className='w-full flexCol gap-4'>
           <h1 className='text-4xl '>Sign Up</h1>
           <p className='text-black/70'>Please Fill in the information below:</p>
        </div>
        <div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
              <input
                type="text"
                name="firstName"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="firstName"
                className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
                  userData.firstName ? '' : '-z-10'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
              >
                First Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
              <input
                type="text"
                name="lastName"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0  focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="lastName"
                className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
                  userData.lastName ? '' : '-z-10'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
              >
                Last Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
              <input
                type="email"
                name="email"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0  focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="email"
                className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
                  userData.email ? '' : '-z-10'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
              >
                E-mail
              </label>
            </div>
            <div className="relative z-0 w-full mb-1 group flex flex-col justify-center ">
              <input
                type={showPassword?"text":"password"}
                name="password"
                id="floating_company"
                onChange={handleChange}
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0  focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="password"
                className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-3 bg-primary px-1 ${
                  userData.password ? '' : '-z-10'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
              >
                Password
              </label>
              <div onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-5 text-lg'>
                {showPassword?
                <FaEye/>
                :
                <FaEyeSlash/>
                }
              </div>
            </div>
            <button className='bg-secondry text-white w-full h-12 text-xl md:text-2xl '>{isLogin?"Login":"Sign up"}</button>
            <div className='flexCenter w-full '>
              <p className='text-black/60'>Already have an Account? <a 
              onClick={()=>setLogin(true)} className='hover:text-black hover:underline hover:underline-offset-1 cursor-pointer'>Sign In</a></p>
            </div>
         </form>
      }
    </div>
  )
}

export default Login