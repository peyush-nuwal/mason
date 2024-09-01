import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import Button from '../components/Button';
import { useNavigate } from 'react-router';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { addAddress ,removeAddress} from '../../Store/User/UserSlice';

const Profile = () => {
     const [orders, setOrders] = useState(0)
       const navigate=  useNavigate()

       const handleNavigate=()=>{
         navigate("/products/men")
       }
  return (
    <div className='w-full h-screen  py-5 md:py-10 px-4 md:px-8 flex flex-col items-start justify-between gap-5' >
      <div className='flex gap-2 items-center text-black/70  text-lg cursor-pointer hover:text-black '> <FaChevronLeft/> <p>Logout</p></div>
      <div className='flex flex-col justify-start gap-3'>
         <h1 className='text-3xl'>Your account</h1>
         <p className='text-xl text-black/70'>View all your orders and manage your account information.</p>
      </div>
      <div className='w-full flex justify-between items-start  '>
         <div className= 'w-4/5 md:w-[70%] flex flex-col items-start justify-between gap-3 '>
             <h1 className='text-sm text-black/60'>Orders</h1>
             <hr className='w-[95%] h-[2px] rounded-full bg-black/10'/>
             {orders>=1
             ?
             <div></div>
              :
              <>
              <p>You haven't placed any order yet</p>
              <div onClick={handleNavigate}>
              <Button title={"Continue shopping"} style={{width:"200px",height:'50px',fontSize:"18px" }}/>
              </div>
              </>
             }
         </div>
         <div className='w-4/5 md:w-[30%] flex flex-col items-start justify-between gap-3 '>
             <h1 className='text-sm text-black/60'>Address</h1>
             <hr className='w-[95%] h-[2px] rounded-full bg-black/10'/>
             <Address/>
         </div>
      </div>
    </div>
  )
}

export default Profile




const Address=()=>{
   const  [showInput,setShowInput]=useState()
   const dispatch=useDispatch()
   const address=useSelector((store)=>store.user.address)
     
  return(

     <div className='flex flex-col  gap-2'>
      {address.map((user,index)=>(

        <p className='text-black/80' key={user.pincode}>
      <div>{user.userName}</div>
      <div>{user.phoneNumber}</div>
      <div>{user.pincode}</div>
      <div>{user.state}</div>
      <div>{user.country}</div>
      <div className='flex gap-2'>
        <Button title={"Edit"} style={{width:"100px",height:'40px',fontSize:"18px" }}/>
        <div onClick={dispatch(removeAddress(index))}>
        <Button title={"Delete"} style={{width:"100px",height:'40px',fontSize:"18px" }}/>
        </div>
        </div>
      </p>
      ))}
      <div onClick={()=>setShowInput((prev=>!prev))}>
        {address&&
        <Button title={"Add address"} style={{width:"160px",height:'40px',fontSize:"18px" }}/>
        }
      </div>
      {showInput&&
      <MangeAddress showInput={showInput} setShowInput={setShowInput} />
      }
     </div>
  )
}

const MangeAddress=({showInput,setShowInput})=>{
    const containerRef=useRef()
    const dispatch =useDispatch()
    const [address,setAddress]=useState({
      userName:"",
      phoneNumber:"",
      address:"",
      pincode :"",
      state:"",
      country:""})

    
    const handleClickOutside=(e)=>{
       if(containerRef.current&& !containerRef.current.contains(e.target)){
            setShowInput(false)
       }
    }
    useEffect(() => {
      if(showInput){
          document.addEventListener("mousedown",handleClickOutside)
        }
        else{
        document.removeEventListener("mousedown",handleClickOutside)
        
      }
      return () => {
        document.removeEventListener("mousedown",handleClickOutside)
       
      }
    }, [showInput])
    
    const handleChange=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }
          console.log(address)
    const handleSubmit=(e)=>{   
      e.preventDefault()
      setShowInput(false)
        dispatch(addAddress(address))
    }
   
   return(
    <div className='w-full h-screen bg-black/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flexCenter'>
     
      <form ref={containerRef} onSubmit={handleSubmit}
       className='bg-primary w-4/5  md:w-[500px]  border-[0.5px] border-white  px-5 py-8 flex flex-col gap-2'>
          <div className='flex justify-between items-center  text-2xl -mt-5 mb-2 font-light ' >
            <div />
          <h1>Add address</h1>
          <div onClick={()=>setShowInput(false)} className='cursor-pointer'>
           <RxCross2/>
          </div>

      </div>
<div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
<input
 type="name"
 name="userName"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
 required
/>
<label
 for="name"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.userName==="" ? 'z-[20]' : '-z-10'
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 Name
</label>
</div>

<div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
<input
 type="tel"
 name="phoneNumber"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
  pattern="[0-9]{10}"
 required
/>
<label
 for="phoneNumber"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.phoneNumber==="" ? '-z-10' : ''
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 phoneNumber
</label>
</div>
<div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
<textarea
 type="text"
 name="address"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
rows="2"
 required
/>
<label
 for="phoneNumber"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.address==="" ? '' : '-z-10'
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 address
</label>
</div>
<div className='flex justify-between items-center gap-2'>
<div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
<input
 type="tel"
 name="pincode"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
  pattern="[0-9]{6}"
 required
/>
<label
 for="pincode"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.pincode==="" ? '' : '-z-10'
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 pincode
</label>
</div>

<div className="relative z-0 w-full mb-1 group flex flex-col justify-center">
<input
 type="name"
 name="state"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
 required
/>
<label
 for="state"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.state ===""? '' : '-z-10'
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 state
</label>
</div>
</div>


<div className="relative z-0 w-full mb-1 group flex flex-col justify-center ">
<input
 type="name"
 name="country"
 id="floating_company"
 onChange={handleChange}
 className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
 placeholder=" "
 required
/>
<label
 for="country"
 className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-2 bg-primary px-1 ${
   address.country==="" ? '' : '-z-10'
 } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:z-10`}
>
 country
</label>
</div>
<div className=''>

<Button title={"Save address"} style={{width:"100%" ,}}/>
</div>

</form>

    </div>
    
   )
}