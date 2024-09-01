import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { assets } from "../assets/assets";
import { easeIn, inView, motion, useInView } from "framer-motion";

const Craftsmanship = () => {
  const ref = useRef();
  
  const inView = useInView(ref, {
    triggerOnce: true,
    margin: "30% 0px 30% 0px",
  });


   

  const slideVariants = {
    out: {
      width: "100%",
    },
    in: {
      width: "0%",

      transition: {
        duration: 0.8,
        ease: easeIn,
      },
    },
  };
  const yVariants = {
    hide: {
      y: "100%",
    },
    show: {
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="w-full">
      <VideoPlayer style={{ margin: "0px" }} />
      <div className="w-full h-[calc(100vh-64px)] flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 h-full flexCenter bg-primary ">
          <div className="w-full sm:w-[80%] px-4 py-5 flexCol gap-4 text-black/70">
            <h1 className="font-light text-2xl sm:text-3xl place-self-start text-black ">
              Craftsmanship
            </h1>

            <p className="text-sm sm:text-base">
              Mason Garments is dedicated to creating lasting luxury - producing
              the best quality products that are timeless. To secure these
              quality standards, we choose to blend the traditional approach of
              handcrafting footwear with modern, innovative techniques.
            </p>

            <p className="text-sm sm:text-base">
              We have a longstanding partnership with our Italian factories,
              that are family-owned businesses with decades of experience in
              making quality products.
            </p>
            <p ref={ref} className="text-sm sm:text-base">
              All our footwear is constructed using only the finest and
              responsibly sourced leathers and materials, providing quality,
              style, and comfort.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full flexCenter relative">
          <img
            src={assets.craft_1}
            alt=""
            className="w-full h-full object-fil "
          />
          <motion.div
            initial="out"
            animate={inView && "in"}
            variants={slideVariants}
            className=" h-full absolute top-0 right-0 z-50 bg-primary  "
          ></motion.div>
        </div>
      </div>

      <motion.div
        initial="hide"
        whileInView="show"
        variants={yVariants}
        viewport={{ once: true, margin: "50% 0px" }}
        className="w-full h-screen flex flex-col sm:flex-row"
      >
        <motion.div
          variants={yVariants}
          className="w-full sm:w-1/2 h-1/2 sm:h-full flexCenter bg-primary "
        >
          <img
            src={assets.craft_2}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          variants={yVariants}
          className="w-full sm:w-1/2 h-1/2 sm:h-full flexCenter"
        >
          <img
            src={assets.craft_3}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hide"
        whileInView="show"
        variants={yVariants}
        viewport={{ once: true, margin: "50% 0px" }}
        className="w-full sm:h-[80vh]"
      >
        <img
          src={assets.craft_4}
          alt=""
          className="w-full h-full object-contain sm:object-cover"
        />
      </motion.div>

      <motion.div
        initial="hide"
        whileInView="show"
        variants={yVariants}
        viewport={{ once: true, margin: "50% 0px" }}
        className="w-full h-screen flex flex-col sm:flex-row"
      >
        <motion.div variants={yVariants} className="w-full sm:w-1/2 h-1/2 sm:h-full flexCenter ">
          <img
            src={assets.craft_5}
            alt=""
            className="w-full  h-full object-cover"
          />
        </motion.div>
        <motion.div variants={yVariants} className="w-full sm:w-1/2 h-1/2 sm:h-full flexCenter">
          <img
            src={assets.craft_6}
            alt=""
            className="w-full   h-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div initial='hide' whileInView="show" variants={yVariants} viewport={{ once: true, margin: "50% 0px" }} className="w-full sm:h-[80vh] ">
        <img
          src={assets.craft_7}
          alt=""
          className="w-full h-full object-contain sm:object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Craftsmanship;
