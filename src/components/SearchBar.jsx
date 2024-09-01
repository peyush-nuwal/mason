import { animate, delay, easeInOut, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Card from "./Card";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar, setQuery } from "../../Store/SearchBar/SearchSlice";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const searchBarRef = useRef(null);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results, isSearchBarVisible } = useSelector((state) => state.search);

  const hideSearch = () => {
    if (value) {
      setValue("");
      dispatch(hideSearchBar());
    } else {
      dispatch(hideSearchBar());
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setValue(query);
    dispatch(setQuery(value));
  };

  const loadMore = () => {
    navigate("/product/search");
    dispatch(hideSearchBar());
  };

  const handleClickOutside = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      hideSearch();
    }
  };

  useEffect(() => {
    if (isSearchBarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchBarVisible]);

  const SearchRes = {
    initial: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        delay: 0.8,
      },
    },
  };

  return (
    <div
      ref={searchBarRef}
      className={`fixed top-16 z-[59] w-full  border-b-[2px] px-3  md:px-8 bg-primary ${
        isSearchBarVisible ? "flexCol" : "hidden"
      }  gap-2  `}
    >
      <div className="w-full h-16 flex justify-between items-center px-3 md:px-8 gap-3 md:gap-8   ">
        <CiSearch className="text-2xl" />
        <input
          onChange={handleSearchChange}
          value={value}
          type="text"
          placeholder="Search For..."
          className="w-[90%] bg-transparent border-none outline-none"
        />
        <RxCross2 className="text-2xl cursor-pointer" onClick={hideSearch} />
      </div>

      <motion.div
        initial="initial"
        animate={value ? "animate" : "initial"}
        variants={SearchRes}
        className={`w-full    ${value ? "flex" : "hidden"} flex-col   `}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="w-full      hidden lg:flex  px-10 py-4  justify-center items-center gap-4 "
        >
          {results.slice(0, 4).map((item) => (
            <motion.div variants={childVariants} key={item.id} className="">
              <Card
                id={item.id}
                img1={item.img1}
                img2={item.img2}
                name={item.name}
                price={item.price}
                discount={item.discount}
                style={{ width: "100%", height: "320px" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="w-full       flex flex-col lg:hidden px-1 py-2  justify-center items-center gap-2 "
        >
          {results.slice(0, 6).map((item) => (
            <motion.div variants={childVariants} key={item.id} className=" w-full">
              <MobileSearchCard
                id={item.id}
                img1={item.img1}
                img2={item.img2}
                name={item.name}
                price={item.price}
                discount={item.discount}
              />
            </motion.div>
          ))}
        </motion.div>
        {results.length===0&&
        <p className="w-full ">No Item Found </p>
      }
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="w-full     flex   justify-center items-center  "
        >
          <Button
            style={{ alignSelf: "center", margin: "20px 0" }}
            title="Load More"
            onClick={loadMore}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SearchBar;

export const MobileSearchCard = ({id, img1, img2, name, price, discount}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <div onClick={handleCardClick} className=" w-full h-16 flex border-[1px] justify-center items-start ">
      <div className=" w-20 h-full ">
        <img src={img1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="w-full flex flex-col py-2 ">
        <div className="w-full">
          <p className="">{name}</p>
        </div>
        <div className="flex gap-1 text-start">
          <p
            className={`${
              discount ? "block" : "hidden"
            } font-normal text-red-800 `}
          >
            Rs.{discount?.toLocaleString()}.00
          </p>

          <p
            className={`${
              discount ? "line-through text-gray-600" : "text-black"
            }`}
          >
            Rs.{price.toLocaleString()}.00
          </p>
        </div>
      </div>
    </div>
  );
};
