import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaAngleRight } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  showSearchBar,  hideSearchBar,  setQuery,} from "../../Store/SearchBar/SearchSlice";
import {handleCart} from "../../Store/User/UserSlice"
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const navLinks = [
  { id: 1, name: "men", path: "men" },
  { id: 2, name: "women", path: "women" },
  { id: 3, name: "accessories", path: "accessories" },
  { id: 4, name: "craftsmanship", path: "craftsmanship" },
];

const hoverVariants = {
  onhover: {
    content: "",
    color: "red",
    transition: {
      duration: 0.1,
    },
  },
};

const mobileOpt = {
  close: {
    x: -600,
  
  },
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [expend, setExpend] = useState(null);
  const [expendSub, setExpendSub] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [category, setCategory] = useState("");
  const mobileMenuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearchBarVisible = useSelector(
    (state) => state.search.isSearchBarVisible
  );
   const isLogedIn=useSelector((state)=>state.user.isLoggedIn)
   const orders=useSelector((state)=>state.user.orders)
  
   

  const showSearch = useCallback(() => {
    isSearchBarVisible ? dispatch(hideSearchBar()) : dispatch(showSearchBar());
  }, [dispatch, isSearchBarVisible]);

  const handleExpend = useCallback(
    (id) => {
      setExpend((prev)=>prev === id ? null : id);
    },
    [expend]
  );

  const handleExpendSub = useCallback(
    (id) => {
      setExpendSub((prev)=>prev === id ? null : id);
    },
    [expendSub]
  );

  const handleClickOutside = useCallback((event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  const onMouseEnter = useCallback((name) => {
    if (name === "men" || name === "women") {
      setDropDown(true);
    }
    setCategory(name);
  }, []);

  const onMouseLeave = useCallback((name) => {
    if (name === "men" || name === "women") {
      setDropDown(false);
    }
  }, []);

  const handleNavigation = useCallback(
    (path) => {
      path === "men" || path === "women"
        ? navigate(`/products/${path}`)
        : navigate(`/${path}`);
      dispatch(setQuery(""));
      setDropDown(false);
      
    },
    [navigate]
  );
  
  const handleProfile=()=>{
        if(isLogedIn){
          navigate("/Profile")
        }
        else{
           navigate("/login")
        }
  }

  const handleCategory = useCallback(
    (categoryName) => {
      navigate(`/products/${categoryName}`);
      setDropDown(false);
      dispatch(setQuery(categoryName));
   
    },
  
  );
  const toggleCart=(status)=>{
      dispatch(handleCart(status))
  }

  return (
    <nav className="justifyBetween fixed z-[99] w-full h-16 border-b-[2px] px-3 md:px-8 bg-primary  ">
      <div className="lg:hidden w-36">
        <IoIosMenu className="text-2xl " onClick={() => setOpen(true)} />
      </div>

      {/* ____________________________________________________Mobile Navbar________________________________________________________________ */}
      <motion.div
        ref={mobileMenuRef}
        initial="close"
        animate={open ? "open" : "close"}
        variants={mobileOpt}
        className="h-screen lg:hidden absolute w-1/2 top-0  left-0 flex flex-col gap-20  px-2 sm:px-5 py-6 bg-white border-2 mobileNav overflow-y-auto"
      >
        <motion.div>
          <RxCross2
            className="text-2xl cursor-pointer lg:hidden "
            onClick={() => setOpen(false)}
          />
        </motion.div>

        <motion.div className="flex flex-col items-start lg:hidden  gap-2 divide-y-2  ">
          {navLinks.map((item) => (
            <div key={item.id} className="w-full">
              <div className="w-full" onClick={() => handleExpend(item.id)}>
                <Link
                  className="text-lg  lg:hidden w-full  flex items-center justify-between font-light navopt "
                 
                >
                  <Link to={item.name==="men"|| item.name==="women"?`/products/${item.path}`:`/${item.path}`} key={item.id} >  {item.name}</Link>
                  {(item.name == "men" || item.name === "women") && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={
                        expend == item.id ? { rotate: 90 } : { rotate: 0 }
                      }
                    >
                      <FaAngleRight className="text-sm" />
                    </motion.div>
                  )}
                </Link>
              </div>
              <AnimatePresence>
                <motion.div layout>
                  {(item.name === "men" || item.name === "women") &&
                    expend === item.id && (
                      <motion.div
                        layout
                        className="px-1 mt-2"
                        initial={{ height: 0 }}
                        animate={
                          expend
                            ? { height: "auto", transition: { duration: 0.5 } }
                            : { height: 0, transition: { duration: 0.5 } }
                        }
                      >
                        {/* shoe categorys  */}
                        {assets.shoe_logo.map((option) => (
                          <>
                          <motion.div
                            layout
                            key={option.id}
                            initial={{ opacity: 0 }}
                            animate={expend&& { opacity:  1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            style={{ display: 'block' }}
                            className="w-full"
                          >
                            <a
                              onClick={() => handleExpendSub(option.id)}
                            
                              className=" py-1 text-sm flex justify-between"
                            >
                              {option.category}
                              <motion.div
                                initial={{ rotate: 0 }}
                                animate={
                                  expendSub == option.id
                                    ? { rotate: 90 }
                                    : { rotate: 0 }
                                }
                              >
                                <FaAngleRight className="text-sm" />
                              </motion.div>
                            </a>

                          
                          </motion.div>
                          {expendSub === option.id && (
                              <motion.div
                              initial={{ height: 0, }}
                              animate={expendSub === option.id ? { height: "auto", } : { height: 0, }}
                              exit={{ height: 0,}}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className=" my-2 overflow-hidden w-full "
                              >
                                {/* shoes name and logo */}
                                {option.logos.map((option) => (
                                  <motion.div
                                  initial={{opacity:0}}
                                    animate={expendSub&&{opacity:1}}
                                    transition={{delay:0.2 ,duration:0.3,}}
                                    exit={{opacity:0}}
                                    key={option.id}
                                    onClick={() =>{ handleCategory(option.name), setOpen(false),setExpend(null),setExpendSub(null)}}
                                    className={`${expendSub?"flex":'hidden'} justify-start items-end gap-4 transition-all delay-100 `}
                                  >
                                    <div className="w-16">
                                      <img
                                        src={option.logo}
                                        alt=""
                                        className="w-full h-full object-contain "
                                      />
                                    </div>
                                    <div className="">{option.name}</div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </>
                        ))}
                      </motion.div>
                    )}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ____________________________________________________Navbar______________________________________________________________________ */}

      <Link to="/" className="w-48 place-content-center">
        <img src={assets.logo_black} alt="" />
      </Link>

      <div className="hidden lg:flex items-center gap-10   ">
        {navLinks.map((item) => (
          <div
            key={item.id}
            className=" font-light navopt cursor-pointer   "
            onMouseEnter={() => onMouseEnter(item.name)}
            onMouseLeave={() => onMouseLeave(item.name)}
            onClick={() => handleNavigation(item.path)}
          >
            {item.name}
          </div>
        ))}
        {dropDown && category && (
          <div
            onMouseEnter={() => setDropDown(true)}
            onMouseLeave={() => setDropDown(false)}
            className=" h-screen  absolute left-0  top-2/3 w-screen "
          >
            <div className="h-[23px] bg-transparent"></div>
            <div className=" h-[80vh]   bg-primary    flex">
              <div className="w-[75%] h-full flex  justify-between px-4  ">
                {assets.shoe_logo.map((option) => (
                  <div key={option.id} className="block  py-6 w-[33%]  ">
                    <h1 className="text-lg">{option.category}</h1>
                    <div className="grid grid-cols-3 gap-2  justify-between">
                      {option.logos.map((logo) => (
                        <div
                          key={logo.id}
                          onClick={() => handleCategory(logo.name)}
                          className="cursor-pointer flex flex-col gap-2 grid-span-1 text-sm"
                        >
                          <img
                            src={logo.logo}
                            alt=""
                            className="w-16 object-contain "
                          />
                          <h1>{logo.name}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-[25%] h-full  ">
                <img
                  src={category == "men" ? assets.shop_men : assets.shop_women}
                  alt=""
                  className="w-full h-full object-contain "
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden justifyEnd lg:flexCenter  gap-[10px] md:gap-4 w-36 lg:w-52 h-10  ">
        <GoPerson className="text-[20px] md:text-2xl   cursor-pointer" onClick={handleProfile} />
        <CiSearch
          className=" text-[20px] md:text-2xl cursor-pointer"
          onClick={showSearch}
        />
        <div className="relative">

        <LiaShoppingBagSolid className="text-[20px] md:text-2xl cursor-pointer" onClick={()=>toggleCart(true)} />
          {orders.length>=1?
          <div className="w-2 h-2 absolute top-[2px] right-[2px] bg-secondry rounded-full"/>
             :""
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
