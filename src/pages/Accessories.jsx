import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Card from "../components/Card";

import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";


const localStorageKey = "shuffleShoes";
const shuffleInterval = 86400000; 


const Accessories = () => {
  const pageRef=useRef();
  const [showOption, setShowOption] = useState(false);
  const [Filter, setFilter] = useState("featured");
  const [shuffleList, setShuffleList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const itemPerPage=32;
  const {query,results,accessories}=useSelector(state=>state.search)


  const getShuffledShoesFromLocalStorage = useCallback(() => {
    const data = localStorage.getItem(localStorageKey);
    if (data) {
      return JSON.parse(data).shuffleShoes;
    }
    return accessories; 
  }, [accessories]);

  const setShuffleShoesToLocalStorage = useCallback((shuffleShoes) => {
    const data = {
      shuffleShoes,
      timeStamp: Date.now(),
    };
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, []);

  const shuffleArray=useCallback((array)=>{
    let newArray=[...array];
    switch (Filter) {
      case "featured":
        const cachedData = getShuffledShoesFromLocalStorage();
          if (
            cachedData &&
            Date.now() - cachedData.timeStamp < shuffleInterval
          ) {
           
            newArray = cachedData.shuffleShoes;
          } else {
         
            newArray = [...array];
            let currentIndex = newArray.length, randomIndex;
            while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [newArray[currentIndex], newArray[randomIndex]] = [
                newArray[currentIndex],
                newArray[randomIndex],
              ];
            }
            setShuffleShoesToLocalStorage(newArray);
          }
        break;
        case "low":
          newArray.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
          break;
        case "high":
          newArray.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
          break;
          case "discount":
            newArray.sort((a, b) => (b.discount ? 1 : -1) - (a.discount ? 1 : -1));
        break;
        default:
          break;
    }
  
     return newArray
  },[Filter,getShuffledShoesFromLocalStorage,setShuffleShoesToLocalStorage])
         
  const shuffledList = useMemo(() => {
    let shoesToDisplay = query ? results : accessories;
    if (shoesToDisplay && shoesToDisplay.length) {
      return shuffleArray(shoesToDisplay);
    }
    return [];
  }, [query, results, accessories, Filter, shuffleArray]);

  useEffect(() => {
    setPageIndex(1);
  }, [query, results, accessories, Filter])


     useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pageIndex]);

      const startPageIndex=(pageIndex-1)*itemPerPage
      const endPageIndex=startPageIndex+itemPerPage
      const extraProducts=useMemo(()=>shuffledList.slice(startPageIndex,endPageIndex),[shuffledList, startPageIndex, endPageIndex])

      const totalPage=useMemo(()=>Math.ceil(shuffledList.length/itemPerPage),[shuffleList.length, itemPerPage])
      const pagesNumbers=useMemo(()=>Array.from({length:totalPage},(_,i)=>i+1),[totalPage])

      const handlePagePrev=useCallback(()=>{
        setPageIndex((prev)=>Math.max(prev-1,1))
      },[])


      const handlePageNext=useCallback(()=>{
        setPageIndex((prev)=>Math.min(prev+1,totalPage))
      },[totalPage])


  return (
    <div className="w-full flexCol "  ref={pageRef}>
      <div className="w-full grid  grid-cols-10  bg-primary h-10 md:h-12 items-center  md:px-10 divide-x-[1px] border-b-2  ">
        <div className="col-span-3 sm:col-span-2"></div>
        <h1 className=" col-span-4 sm:col-span-6 text-sm sm:text-base  font-medium text-black/80 h-full flexCenter">
          {query?results.length:accessories.length} Results
        </h1>

        <div className="relative h-full w-full col-span-3 sm:col-span-2 ">
          <div
            className="h-10 md:h-12   flex items-center justify-around gap-5 p-3 text-sm sm:text-base font-normal text-black/60"
            onClick={() => setShowOption(!showOption)}
          >
            Sort By
            <motion.div
              initial={{ rotate: 0 }}
              animate={showOption ? { rotate: -180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoIosArrowDown />
            </motion.div>
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={showOption ? { height: "auto" } : { height: 0 }}
            transition={{
              duration: 0.4,
              staggerChildren: 0.3,
              when: "beforeChildren",
            }}
            className={` ${
              showOption ? "fleCol" : "hidden"
            } row-gap-4 absolute top-full border-[1px] py-2 left-0 z-30 bg-primary w-full overflow-hidden`}
          >
            <motion.p
              whileHover={{ scale: 1.05 }}
              initial={{ y: "-100%" }}
              animate={showOption ? { y: 0 } : { y: "-100%" }}
              transition={{ duration: 0.5 }}
              className={`py-1 px-2 font-light ${Filter === "featured"? "text-black" : "text-black/60" } hover:text-black   `}
              onClick={() => {
                setFilter("featured"), setShowOption(false);
              }}
            >
              Featured
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              initial={{ y: "-200%" }}
              animate={showOption ? { y: 0 } : { y: "-200%" }}
              transition={{ duration: 0.4 }}
              className={`py-1 px-2 font-light ${Filter === "low"? "text-black" : "text-black/60" } hover:text-black   `}
              onClick={() => {
                setFilter("low"), setShowOption(false);
              }}
            >
              Low To High
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              initial={{ y: "-300%" }}
              animate={showOption ? { y: 0 } : { y: "-300%" }}
              transition={{ duration: 0.3 }}
              className={`py-1 px-2 font-light ${Filter === "high"? "text-black" : "text-black/60" } hover:text-black   `}
              onClick={() => {
                setFilter("high"), setShowOption(false);
              }}
            >
              High To Low
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              initial={{ y: "-300%" }}
              animate={showOption ? { y: 0 } : { y: "-300%" }}
              transition={{ duration: 0.3 }}
              className={`py-1 px-2 font-light ${Filter === "discount"? "text-black" : "text-black/60" } hover:text-black   `}
              onClick={() => {
                setFilter("discount"), setShowOption(false);
              }}
            >
              Discount
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div
        className={` w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  my-2  gap-1 sm:gap-2 p-2 sm:p-3   mx-auto  `}
      >
       <AnimatePresence>

        
        {extraProducts.map((item) => (
            <motion.div
            key={item.id} 
            layout 
            
            animate= {{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            
          >
          <Card
          layout
          id={item.id}
          
          img1={item.img1}
          img2={item.img1}
          name={item.name}
          price={item.price}
          discount={item.discount}
          save={item.save}
          onSale={item.onSale}
          />
           </motion.div>
        ))}
       
      </AnimatePresence>
      </div>
      <div className={`w-full ${totalPage===1?"hidden": "flexCenter"} my-3 `}>
        {totalPage>=1&&
         <div className=" w-fit relative justifyBetween text-sm font-light gap-2 text-black/80 border-b-4 border-black/20  py-1">
          <motion.div   className={`${pageIndex === 1 ? "hidden" : "flex" } px-2 py-1 cursor-pointer `}>
            <FaChevronLeft
             onClick={handlePagePrev}/> 
            </motion.div>
            <div className="w-fit flex content-center relative"  >

            {pagesNumbers.map((index)=>(
              <button onClick={()=>setPageIndex(index)} key={index} className={`${pageIndex==index? "text-black" : " text-black/50"} py-1 px-2 `}  >{index}</button>
            ))}
            <motion.div animate={{x: pageIndex===1?"0%":`${(pageIndex-1)*24}px`,y:8}} transition={{duration:0.4}}  className="absolute left-0 bottom-0 bg-black h-1 px-[14px] translate-y-2     "></motion.div>
            </div>
            
          <div className={`${pageIndex === totalPage? "hidden" : "flex"} px-2 py-1 cursor-pointer`}>
            <FaChevronRight
             onClick={handlePageNext}/>
            </div>
            
         </div>
            }
      </div>
    </div>
  )
}

export default Accessories