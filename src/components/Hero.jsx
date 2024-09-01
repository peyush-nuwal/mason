import React from 'react'
import { assets } from '../assets/assets'
import Button from './Button'

const Hero = ({num}) => {
  let content;


  switch(num){
     case 1:
     content=(
      <div className='w-full Hero bg-cover bg-center    bg-[url("assets/mobile_banner.webp")] md:bg-[url("assets/banner_1.jpeg")] flex flex-col items-center justify-center lg:items-start  lg:justify-end gap-4  p-10 md:p-12'>
      <h1 className='  text-3xl sm:text-4xl md:text-6xl font-light'>Season Sale Is Live</h1>
      <Button title={" SHOP NOW "}/>
  </div>
     )

    break;

     case 2:
      content=(
       <div   
       className='w-full Hero bg-cover bg-center  relative   bg-[url("assets/mobile_banner_2.webp")] md:bg-[url("assets/banner_2.jpeg")] flex flex-col items-center justify-center  gap-4  p-10 md:p-20  '>
         <h4 className='text-2xl sm:text-3xl md:text-4xl font-thin text-white'>Up to 50% off</h4>
       <h1 className='  text-3xl sm:text-4xl md:text-6xl  text-white'>Season Sale </h1>
       <Button title={" SHOP SALE "}/>
       </div>
      )
      break;

      case 3:
      content=(
        <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className={`w-full Hero  flexCenter bg-cover bg-center  relative   bg-[url("src/assets/banner_3_1.jpeg")]`}>
       
          <h1 className='text-white text-3xl sm:text-4xl   font-thin'>CITTÁ</h1>
        </div>


        <div className={`w-full Hero  flexCenter bg-cover bg-center  relative   bg-[url("src/assets/banner_3_2.jpeg")]`}>
         
          <h1 className='text-white text-3xl sm:text-4xl  font-thin'>SCALARE</h1>
        </div>


        <div className={`w-full Hero  flexCenter bg-cover bg-center  relative   bg-[url("src/assets/banner_3_3.jpeg")]`}>
         
          <h1 className='text-white text-3xl sm:text-4xl  font-thin '>AMALFI</h1>
        </div>

       </div>
      )
      break;

      default:
        content=(
           "Something went wrong"
         )
       
  }
 return content
}

export default Hero