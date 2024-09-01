import React, { useEffect, useState } from "react";
import Card from "./Card";
import { animate, easeIn, motion, useAnimation } from "framer-motion";
import Button from "./Button";
import { RxCross1 } from "react-icons/rx";
const Featured = ({id, feature, img1, name, price, save, discount, onSale }) => {
  const [isActive, setIsActive] = useState(false);
  const [overflow, setOverflow] = useState(true);
  const control = useAnimation();
  const CardVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeIn,
      },
    },
  };

  const imgVariants = {
    initial: {
      width: "100%",
    },
    animate: {
      width: "0%",
      transition: {
        duration: 0.8,
        ease: easeIn,
      },
    },
  };

  const mobileImgVariants = {
    initial: {
      width: "90%",
      y: 0,
    },
    animate: {
      width: "100%",
      y: -60,
      zIndex: 20,
      transition: {
        duration: 0.8,
      },
    },
  };

  const mobileCardVariants = {
    initial: {
      opacity: 0,

      y: 0,
    },
    animate: {
      opacity: 1,
      zIndex: 1000,
      y: "-25%",
      transition: {
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (isActive) {
      control.start("animate");
      setOverflow(false);
    } else {
      control.start("initial");
      setOverflow(true);
    }
  }, [isActive, control]);

  return (
    <div className="w-screen mb-5">
      <div className="hidden md:flex  sm:w-[90%] lg:w-[80%] mx-auto sm:gap-3 lg:gap-0 shrink-0 ">
        <motion.div className="w-1/2 max-h-[550px] relative">
          <img src={feature} alt="" className="w-full h-full object-cover" />
          <motion.div
            className=" absolute top-0 right-0 w-full h-full bg-white "
            variants={imgVariants}
            initial="initial"
            animate="animate"
          ></motion.div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={CardVariants}
          className="w-1/2 h-full place-self-center flexCenter gap-3 "
        >
          <Card
          id={id}
            img1={img1}
            img2={img1}
            name={name}
            price={price}
            discount={discount}
            style={{width:"80%",}}
          />
          
        
        </motion.div>
      </div>

      {/* mobilediv  */}
      <div className={`flexCol w-full md:hidden shrink-0 relative`}>
        <motion.div
          initial="initial"
          animate={control}
          variants={mobileImgVariants}
          className=" w-[90%] mx-auto  "
        >
          <img src={feature} alt="" />
        </motion.div>
        <motion.div
          className=" absolute top-0 right-0 w-full h-full bg-white "
          variants={imgVariants}
          initial="initial"
          animate="animate"
        ></motion.div>
        <div
          onClick={() => setIsActive(!isActive)}
          className="w-[90%] mx-auto flexCenter"
        >
          <Button
            title={"View Product"}
            style={{
              width: "90%",
              height: "50px",
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </div>

        <motion.div
          initial="initial"
          animate={control}
          variants={mobileCardVariants}
          className={` w-full bg-primary ${overflow ? "hidden" : "flexCol"} `}
        >
          <div className=" w-full h-10 flex justify-end items-center bg-primary">
            <p className="text-lg font-medium w-[90%] text-center pl-12">
              Shop to look
            </p>
            <div
              onClick={() => setIsActive(!isActive)}
              className="text-2xl w-[10%]"
            >
              <RxCross1 />
            </div>
          </div>
          <Card
             id={id}
            img1={img1}
            img2={img1}
            name={name}
            price={price}
            discount={discount}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Featured;
