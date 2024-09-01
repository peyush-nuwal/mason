import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
const choose = () => {
    const [dividerPosition, setDividerPosition] = useState(50);
      const containerRef=useRef(null)

      const handleMouseDown = (e) => {
        e.preventDefault();
        const startX=e.clientX

      const mouseMove=(e)=>{
        const container=containerRef.current
        const containerRect=container.getBoundingClientRect()
        const dividerPosition = ((e.clientX-containerRect.left)/containerRect.width)*100
        setDividerPosition(Math.min(98,Math.max(2,dividerPosition)))
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', onMouseUp);



   
    };


    const HandleTouchStart=(e)=>{
        e.preventDefault();
        const startX = e.touches[0].clientX;

        const touchMove = (e) => {
          const container = containerRef.current;
          const containerRect = container.getBoundingClientRect();
          const newDividerPosition = ((e.touches[0].clientX - containerRect.left) / containerRect.width) * 100;
          setDividerPosition(Math.min(98, Math.max(2, newDividerPosition)));
        };

        const onTouchEnd = () => {
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', onTouchEnd);
          };
      
          document.addEventListener('touchmove', touchMove);
          document.addEventListener('touchend', onTouchEnd);
    }
     
  return (
    <div className='w-screen overflow-hidden sm:w-full relative ' ref={containerRef}>
        {/* after */}
    <div className='h-full w-full  flex items-end justify-end relative  '
      style={{ clipPath: `polygon(0 0, ${dividerPosition}% 0, ${dividerPosition}% 100%, 0% 100%)` }}
    >
       <img src={assets.choose_1} alt="" 
       className='w-full h-full object-cover place-self-center'/>
             
              <div className='absolute left-3 bottom-2 sm:left-10 sm:bottom-8    flex flex-col items-start justify-center'>
        <h1 className='text-base sm:text-xl md:text-2xl'>Tia Archetipo Taupe</h1>
        <a href="#" className='view-Product text-sm'>View Product</a>
            </div>
         
    </div>

    <div className='h-full w-full   flex items-end justify-end absolute top-0 left-0 z-50  '
        style={{ clipPath: `polygon(${dividerPosition}% 0, 100% 0, 100% 100%, ${dividerPosition}% 100%)` }}
    >
       <img src={assets.choose_2} alt="" 
       className='w-full h-full object-contain place-self-center'/>
           
         
           <div className='absolute right-3 bottom-2 sm:right-10 smLbottom-8  flex flex-col items-end justify-center'
         
         >
          <h1 className='text-base sm:text-xl md:text-2xl'>Tia Archetipo Brown</h1>
          <a href="#" className='view-Product text-sm'>View Product</a>
              </div>
        
    </div>

    {/* left text */}


    <div
        className='absolute top-0 bottom-0 z-50   flex justify-center items-center'
        style={{ left: `${dividerPosition}%`, cursor: 'ew-resize', width: '3px', backgroundColor: 'rgba(255,0,0,0.0)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={HandleTouchStart}
        
      >              
        <div className=' '>
            <div className='w-16 h-16 rounded-full bg-white flex justify-center items-center gap-5'>

       <FaChevronLeft/>
       <FaChevronRight/>
            </div>
        </div>
      </div>
        
         {/* right text  */}
       
      
    </div>
  )
}

export default choose