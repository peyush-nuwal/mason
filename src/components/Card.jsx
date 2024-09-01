import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

const Card = ({id,img1, img2, name, price, discount, scrollX, style }) => {
  const save = discount ? price - discount : null;
  const [isHovered, setIsHovered] = useState(false);
     const navigate=useNavigate()
    
  const handleCardClick = () => {
    const formattedName=name.replace(/\s+/g,"-")
    navigate(`/product/${encodeURIComponent(formattedName)}`);
  };
  return (
    <motion.div
      animate={{ x: scrollX }}
      transition={{ type: "tween", duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="bg-primary shrink-0 max-w-[220px] max-h-[390px] sm:max-w-[350px] sm:h-[450px]   py-4   flexCol gap-[10px]  "
      style={style}
    >
      <div
        className={` place-self-start  rounded-md md:w-48 py-[7px] mt-1 ml-2 md:mt-1 md:ml-3 px-3 sm:px-4 flex items-center justify-center  ${
          discount ? "bg-red-900 text-white" : "invisible"
        }`}
      >
        <h2 className={`  text-xs sm:text-lg font-light `}>
          Save Rs.{save !== null ? save.toLocaleString() : null}.00
        </h2>
      </div>
      <div className=" h-[70%] w-full ">
        <img
          src={isHovered ? img2 : img1}
          alt=""
          className="w-full h-full object-cover sm:object-cover "
        />
      </div>
      <div className="h-[20%] w-full px-1 sm:px-3 sm:py-2 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
        <div className="w-full sm:w-[50%] lg:w-[55%] h-full flex-wrap   ">
          <h2 className=" card-name text-sm  md:text-base lg:text-lg font-normal overflow-hidden text-ellipsis "> {name}</h2>
        </div>
        <div className="w-full sm:w-[50%] lg:w-[45%] h-full  flex flex-col justify-center items-start sm:items-end text-xs sm:text-lg ">
          <h2
            className={`${
              discount ? "block" : "invisible"
            } font-normal text-red-800 `}
          >
            Rs.{discount?.toLocaleString()}.00
          </h2>

          <h2
            className={`${
              discount ? "line-through text-gray-600" : "text-black"
            }`}
          >
            Rs.{price.toLocaleString()}.00
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
