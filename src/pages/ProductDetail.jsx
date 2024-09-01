import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { motion } from 'framer-motion';
import Button from '../components/Button'
import Card from '../components/Card';
import { addOrder, handleCart } from '../../Store/User/UserSlice';


const ProductDetail = () => {
  const { name } = useParams("new");
  const formattedName = name.replace(/-/g, ' ');
  const { products, accessories, results } = useSelector((state) => state.search);
  const [displayImg, setDisplayImg] = useState(1)
  const [showDesc, setShowDesc] = useState(false)
  const [extraDetails,setExtraDetails]=useState(0)
  const saleRef = useRef();
  const [active, setActive] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate=useNavigate();
  const dispatch =useDispatch();

  
   
  useEffect(() => {
    window.scrollTo({top:0})
     
    }, [name,formattedName,results,products,accessories])
  const shuffleArray=(array)=>{
    let currentIndex=array.length,randomIndex;
   
    while(currentIndex!==0){
      randomIndex=Math.floor(Math.random()*currentIndex)
      currentIndex--
      [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]]
    }
    return array
  }
  const shuffledProducts = useMemo(() => shuffleArray([...products,accessories]), [products,accessories ]);

  const randomProducts = useMemo(() => shuffleArray(shuffledProducts).slice(0, 8), [shuffledProducts,accessories]);

  const product=useMemo(()=>{
    if (!formattedName) return null;
    
     let item= results.find((item)=>item.name===formattedName)
     if(!item){
      
        item=products.find((product)=>product.name===formattedName)
      
       if(name.startsWith("accessory-")){
       
        item=accessories.find((accessory)=>accessory.name===formattedName)
       }
     }
     
 
    
     return item
  },[name,formattedName,results,products,accessories])

 
  const findSimilar = useMemo(() => {
    if (!product) return [];
    
    
    const productNameKeywords = product.name.split(" ").slice(0, 2).join(" ");


      return products.filter(p => {
        const pNameKeywords = p.name.split(" ").slice(0, 2).join(" ");
        
        return (
          pNameKeywords === productNameKeywords &&
          p.name !== product.name
        );
      });

  }, [product, products]);

   const getDisplayImg=()=>{
    const images = [product.img1, product.img2, product.img3, product.img4].filter(Boolean);
    return images[displayImg - 1] || product.img1;
   }
   const hangleImgNext = (e) =>{
    e.stopPropagation();
    const totalImgs=[product.img1,product.img2,product.img3,product.img4].filter(Boolean).length

    setDisplayImg((prev)=>prev===totalImgs?1:prev+1)
    
   }
   
   const handleImgPrev=(e)=>{
    e.stopPropagation();
    const totalImgs=[product.img1,product.img2,product.img3,product.img4].filter(Boolean).length
    setDisplayImg((prev)=>  1=== prev?totalImgs:prev-1 )
   }
   
   const HandleShoeMore=()=>{
       setShowDesc(prev=>!prev)
   }


   useEffect(() => {
    if (saleRef.current) {
      const maxScroll =
        saleRef.current.scrollWidth - saleRef.current.clientWidth;
      if (scrollX > maxScroll) {
        setScrollX(maxScroll);
      }
      if (scrollX < 0) {
        setScrollX(0);
      }
    }
  }, [scrollX]);

  const scrollNext = () => {
    if (saleRef.current) {
      const offSet = saleRef.current.offsetWidth;
      setScrollX((prev) => {
        const maxScroll =
          saleRef.current.scrollWidth - saleRef.current.clientWidth;
        return Math.min(prev + offSet, maxScroll);
      });
    }
  };

  const scrollPrev = () => {
    if (saleRef.current) {
      const offSet = saleRef.current.offsetWidth;
      setScrollX((prev) => Math.max(prev - offSet, 0));
    }
  };

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setActive(true);
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setActive(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - saleRef.current.offsetLeft);
    setScrollLeft(saleRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - saleRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    saleRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  }
   
   const handleAddToCart=(id,status)=>{
      dispatch(addOrder(id))
      dispatch(handleCart(status))
   } 


   

   if (!product) {
    return <div>Product not found</div>;
  }
   
  const showDetails={
     close:{
      height:"0px",
       opacity:0
     },
     open:{
      height:"auto",

      opacity:1
     },
    transition:{
      duration:0.2
    }

  }

  return (
    <>
    <div className=' flex flex-col lg:flex-row  bg-primary/50 overflow-x-hidden'>
      <div className=' lg:w-1/2 lg:h-[100vh] sticky top-0 left-0  select-none  '>
        <img src={getDisplayImg()} alt="" className='w-full h-full  object-contain md:object-cover select-none '/> 
        <div   onClick={handleImgPrev} className='absolute top-1/2 -translate-y-1/2 left-3 z-[25] text-2xl bg-white w-12 h-12 rounded-full flexCenter'><FaAngleLeft/></div>
        <div onClick={hangleImgNext} className='absolute top-1/2 -translate-y-1/2 right-3 z-[25]  text-2xl bg-white w-12 h-12 rounded-full flexCenter'><FaAngleRight/></div>
         <div className='h-16 absolute z-20 bottom-0 left-1/2 -translate-x-1/2 flexCenter gap-3 shadow-lg '>
          <div className={`h-16 w-16 ${product.img1?"block":"hidden"} ${displayImg===1?"border-2 border-white":""} `} onClick={()=>setDisplayImg(1)}>{product.img1 && (<img src={product.img1} alt="" className='w-full h-full object-contain'/>)} </div>
          <div className={`h-16 w-16 ${product.img2?"block":"hidden"} ${displayImg===2?"border-2 border-white":""} `} onClick={()=>setDisplayImg(2)}>{product.img2 && (<img src={product.img2} alt="" className='w-full h-full object-contain'/>)} </div>
          <div className={`h-16 w-16 ${product.img3?"block":"hidden"} ${displayImg===3?"border-2 border-white":""}`} onClick={()=>setDisplayImg(3)}>{product.img3 && (<img src={product.img3} alt="" className='w-full h-full object-contain'/>)}</div>
          <div className={`h-16 w-16 ${product.img4?"block":"hidden"} ${displayImg===4?"border-2 border-white":""}`} onClick={()=>setDisplayImg(4)}>{product.img4 && (<img src={product.img4} alt="" className='w-full h-full object-contain'/>)}</div>
         </div>
      </div>


          {/* _-------------right Side---------------_ */}
      <div className='lg:w-1/2 flex flex-col  items-center py-2 md:p-6 '>
      <div className='w-full flex flex-col justify-start items-start p-3 md:p-6 gap-4' > 
      <h1 className='text-3xl '>{product.name}</h1>
      <div>

      <p    className={`text-sm h-auto text-black/60 w-full   ${showDesc?"h-auto":" h-10  line-clamp-2"} `}>   
      {product.desc.split('\n').map((line, index) => (
        <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}

      </p>
      <a onClick={HandleShoeMore} className='underline underline-offset-1 '> {showDesc?"Show Less":"Show More"}</a>
        </div>

       <div className='flex items-center gap-2 text-2xl '>
         <h4 className={`${product.discount?"text-red-800  block":"hidden"}  `}>Rs. {product.discount?.toLocaleString()}.00</h4>
         <h4 className={`${product.discount?"line-through text-black/70":"text-black"}`}>Rs.{ product.price.toLocaleString()}.00</h4>
        </div> 
      </div>
      <hr className='w-[95%] h-[2px] rounded-full bg-black/40'/>
     
      <div className='w-full flex flex-col justify-center items-center py-3 px-4 gap-5'>
        {findSimilar.length>=1 &&(
        
        <div className={`w-full 'bg-red-400 flex flex-col justify-start gap-2`}>
          <p>Colors:</p>
        <div className='w-full flex justify-start gap-2'>

          {findSimilar.slice(0,6).map((item)=>(
            
            <Link to={`/product/${item.name.replace(/\s+/g, '-')}`} className=' w-20 h-20 rounded-lg overflow-hidden cursor-pointer' key={item.id}>
             <img src={item.img1} alt=""  />
            </Link> 
            ))
          }
        </div>
        </div>
        )
        }
         {name.startsWith("accessory-")&&
        <div className={`w-full 'bg-red-400 flex flex-col  justify-start gap-2`}>
          <p>Sizes:</p>
        <div className='md:w-[90%] flex justify-between gap-2 px-3 md:px-10'>

          {[37,38,39,40,41,42,43,44,45,46].map((item)=>(
            
            <div  className='w-5 h-5 flexCenter rounded-lg overflow-hidden hover:underline hover:underline-offset-1 cursor-pointer' key={item.id}>
             <p>{item}</p>
            </div> 
            ))
          }
        </div>
        </div>
          }
        <div className='w-full lg:w-4/5 flexCenter mt-5 ' >

        <Button style={{width:"100%",height:"55px" }} title={"Add To Cart"} onClick={()=>handleAddToCart(product,true)}/>
        </div>
        <hr className='w-[95%] h-[2px] rounded-full bg-black/40'/>
        <div className='w-full divide-y-2 flexCol  '>
          
          <motion.div className=' w-[95%]   flex flex-col justify-center  overflow-y-hidden px-2 ' onClick={()=>setExtraDetails(prev=>prev===1?0:1)}>

            <h1 className='flex justify-between items-center  text-lg md:text-xl py-3 tracking-wider '>PRODUCTS DETAILS<motion.div animate={extraDetails==1?{rotate:90}:{rotate:0}} transition={{duration:0.2}}><FaAngleRight/> </motion.div></h1>

            <motion.div  initial="close" animate={extraDetails===1?"open":"close"}  variants={showDetails}  className='w-full '>
            <ul className="list-disc  ">
            <li>Nubuck upper from Italian tanneries</li>
            <li>Colours: grey, white</li>
            <li>Fits true to size. We recommend checking the size chart</li>
            <li>Custom rubber outsole</li>
            <li>Silver metal details</li>
            <li>Soft mesh inner lining</li>
            <li>Ergonomic foam insole</li>
            <li>Sustainably sourced materials</li>
            <li>Handmade in Italy</li>
            <li>Shoebox from recycled and recyclable cardboard paper</li>
            </ul>
            </motion.div>

          </motion.div>
         
      
       
          <motion.div className=' w-[95%]   flex flex-col justify-center    overflow-y-hidden px-2  ' onClick={()=>setExtraDetails(prev=>prev===2?0:2)}>

            <h1 className='flex justify-between items-center  text-lg md:text-xl py-3 tracking-wider '>SIZE AND FIT<motion.div animate={extraDetails==2?{rotate:90}:{rotate:0}} transition={{duration:0.2}}><FaAngleRight/> </motion.div></h1>
            
            <motion.div  initial="close" animate={extraDetails===2?"open":"close"}  variants={showDetails}  className={`w-full ${extraDetails===3?"flex" :"hidden"}flex-col justify-center items-start gap-3 `}>
            <p>
            Mason Garments puts great effort into sourcing only the highest quality materials. Please note that high quality does not mean that the products are not prone to damage. Please handle your shoes with the utmost care to ensure the longest lifespan:
            </p>
            <ul className="list-disc  ">
            <li>Protect your footwear from too much direct rain, light, extreme heat and cold.</li>
            <li>If the shoes do get wet, dry them with a soft cloth immediately after their contact with water.</li>
            <li>Fits true to size. We recommend checking the size chart</li>
            <li>To help hold the shape and absorb any excess moisture, fill the shoes with the provided filling paper when not in use.</li>
            <li>Have a look at our cleaning product page to find the proper products to protect and clean your shoes.</li>
            <li>Follow these steps to clean the footwear:</li>
            </ul>
            <p className='text-black/80 py-2'>
            <span className='text-black font-medium'> Step 1:</span> When cleaning suedes and nubuck, use the brush from our Jason Markk Suede Cleaning Kit to lightly brush off any excess dirt. Use the harder brush provided in the Jason Markk Essential Kit to lightly brush the outsoles and more durable materials such as leathers.
            </p>
            <p className='text-black/80 py-2'>
            <span className='text-black font-medium'> Step 2:</span>After brushing, use the Jason Markk Suede Cleaning Kit’s eraser to gently erase most stubborn dirt stains on the outsoles, suedes and nubuck.
            </p>
            <p className='text-black/80 py-2'>
            <span className='text-black font-medium'> Step 3:</span>On more durable leathers and outsoles, use the cleaning solution and brush provided in the Jason Markk Essential Kit. Dry gently with a cloth. We do not recommend using this cleaning for dyed suedes and nubuck since they are most likely to bleed in contact with the solution.
            </p>
            <p className='text-black/80 py-2'>
            <span className='text-black font-medium'> Step 4:</span> Protect your suede, nubuck, canvas and other absorbent material shoes against liquids and stains with Jason Markk Repel Spray. The odorless and colorless formula will not alter the look or feel of the material.
            </p>
            </motion.div>

          </motion.div>
         
          
          <motion.div className=' w-[95%]   flex flex-col justify-center   overflow-y-hidden px-2 ' onClick={()=>setExtraDetails(prev=>prev===3?0:3)}>

            <h1 className='flex justify-between items-center  text-lg md:text-xl py-3  tracking-wider '>RETURNS<motion.div animate={extraDetails==3?{rotate:90}:{rotate:0}} transition={{duration:0.2}}><FaAngleRight/> </motion.div></h1>
            
            <motion.div  initial="close" animate={extraDetails===3?"open":"close"}  variants={showDetails}  className={`w-full ${extraDetails===3?"flex" :"hidden"}flex-col justify-center items-start gap-3 divide-y-2`}>
              <div>
              <p className='text-black/80 py-2'>
              Products must be returned within 14 days of receipt in order to qualify for a refund or exchange. The returns and exchanges must be registered via our Returnista Portal. Here you can buy your return label and track your return at all times. Orders not sent through our return portal can unfortunately not be accepted.
            </p>

            <p className='text-black/80 py-2'>
            In order to qualify for a refund or exchange, the following rules apply:
            </p>
            <ul className="list-disc  ">
            <li>Products must be unworn and accompanied by the original tags.</li>
            <li>Products must be returned in their original and undamaged shoebox.</li>
            <li>Returns must be provided with the completed Return Form.</li>
            <li>Shipping fees are non-refundable.</li>    
            </ul>

            <p className='text-black/80 py-2'>If the returned products do not meet these requirements, they will not be accepted and will be sent back to you.
            </p> 

             <p className='text-black/80 py-2'>
             Returns and exchanges are processed within 10 days of receipt. Please, note that it may take up to 5 days for the booking to appear on your account.
            </p>

              </div>
              <div className='flex flex-col justify-center items-start gap-3 py-4'>
              <p className='text-black/80 py-1'>
              If you have any questions regarding your return or exchange, please contact us directly at <span className='underline underline-offset-1'>
              customerservice@masongarments.com.  </span> 
            </p>
            <p className='text-black/80 py-1'>
            For questions about your return label, please contact our partner Returnista via: <br />
            Phone: +31 20 225 52 16  <br />
            <span className='underline underline-offset-1'>
            Mail: support@returnista.nl</span> 
              <br />
            </p>
              </div>
            </motion.div>

          </motion.div>
         
        </div>
         
      </div>

      </div>

    
    </div>
    <div className='flexCol  py-6 overflow-x-hidden'>
       <h1 className='text-4xl tracking-widest font-extralight'>You May Also like </h1>
       <div className=" mt-4 md:mt-10 relative w-screen">
        <div
          onClick={scrollPrev}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`h-12 w-12 rounded-full bg-white border-[1px] absolute top-1/2 left-2 translate-y-[-50%] z-50  cursor-pointer text-xl ${
            active ? "flexCenter" : "hidden"
          }  `}
        >
          <FaAngleLeft />
        </div>
        <motion.div
          className="overflow-x-hidden w-full flex gap-5 px-5 saleScroll relative"
          ref={saleRef}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {randomProducts.map((item) => (
            <Card
            id={item.id}
              img1={item.img1}
              img2={item.img2}
              name={item.name}
              price={item.price}
              discount={item.discount}
              key={item.id}
              scrollX={-scrollX}
            />
          ))}
        </motion.div>
        <div
          onClick={scrollNext}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`h-12 w-12 rounded-full bg-white border-[1px] absolute top-1/2 right-2 translate-y-[-50%]  z-50 cursor-pointer text-xl ${
            active ? "flexCenter" : "hidden"
          } `}
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetail



