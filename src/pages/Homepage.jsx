import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import Choose from "../components/choose";
import Featured from "../components/Featured";
import VideoPlayer from "../components/VideoPlayer";

const Homepage = () => {
  const [active, setActive] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [featureShoe, setFeatureShoe] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const saleRef = useRef();

  const featureArray = [1, 2, 3];

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
    const walk = (x - startX) * 1.5; // adjust the scrolling speed
    saleRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  }
   
  const handleFeatureNext = (e) => {
    e.stopPropagation();
    setFeatureShoe((prev) => (prev === 3 ? 1 : prev + 1));
  };
  const handleFeaturePrev = (e) => {
    e.stopPropagation();
    setFeatureShoe((prev) => (prev === 1 ? 3 : prev - 1));
  };

  return (
    <section>
      <Hero num={1} />
      <p className="  text-xl  sm:text-4xl md:5xl font-light m-6 sm:m-8 md:m-10">
        Seasonal Sale
      </p>

      {/* {sale } */}
      <div className=" mb-5 relative">
        <div
          onClick={scrollPrev}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`h-12 w-12 rounded-full bg-white border-[1px] absolute top-1/2 left-2 translate-y-[-50%] z-50  cursor-pointer text-xl ${
            active ? "flexCenter" : "hidden"
          }  `}
        >
          <FaChevronLeft />
        </div>
        <motion.div
          className="overflow-x-auto w-full flex gap-5 px-5 saleScroll relative"
          ref={saleRef}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          {assets.seasonSale.map((item) => (
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
          <FaChevronRight />
        </div>
      </div>

      <Hero num={2} />

      {/* cita sneakers  */}
      <p className="  text-xl  sm:text-4xl md:5xl font-light m-6 sm:m-8 md:m-10">
        EXPLORE CITTÁ SNEAKERS
      </p>
      <div className="w-full  sm:h-[380px] md:h-[390px] lg:h-auto px-2  sm:px-5 overflow-x-hidden lg:overflow-visible grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4  place-items-center   gap-1 sm:gap-3 ">
        {assets.explore.map((item) => (
          <div key={item.id} className="span-1">
            <Card
            id={item.id}
              img1={item.img1}
              img2={item.img2}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          </div>
        ))}
      </div>

      {/* before-after  */}
      <p className=" text-xl  sm:text-4xl md:5xl text-center font-light m-6 sm:m-8 md:m-10">
        CHOOSE YOUR COLOR
      </p>
      <Choose />

      {/* video-section  */}

      <VideoPlayer />

      {/* Featured   */}
      <p className="  text-2xl  sm:text-5xl md:6xl text-center font-light m-6 sm:m-8 md:m-10">
        SHOP OUR LOOKS
      </p>
      <div className="w-full h-full flex  overflow-hidden relative ">
        <div
          onClick={handleFeaturePrev}
          className={`h-12 w-12 rounded-full bg-white border-[1px] absolute  top-1/2 left-2 translate-y-[-50%] z-[42]  cursor-pointer text-xl flexCenter   `}
        >
          <FaChevronLeft />
        </div>

        <div key={featureShoe} className="">
          <Featured
          id={assets.featured[featureShoe - 1].id}
            feature={assets.featured[featureShoe - 1].img1}
            img1={assets.featured[featureShoe - 1].img2}
            name={assets.featured[featureShoe - 1].name}
            price={assets.featured[featureShoe - 1].price}
            discount={assets.featured[featureShoe - 1].discount}
          />
        </div>

        <div
          onClick={handleFeatureNext}
          className={`h-12 w-12 rounded-full bg-white border-[1px] absolute  top-1/2 right-2 translate-y-[-50%]  z-[42]  cursor-pointer text-xl flexCenter`}
        >
          <FaChevronRight />
        </div>
      </div>

      <p className="  text-xl  sm:text-4xl md:5xl text-center font-light m-6 sm:m-8 md:m-10">
        DISCOVER OUR PILLARS
      </p>
      <Hero num={3} />
    </section>
  );
};

export default Homepage;
