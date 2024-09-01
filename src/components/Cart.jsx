import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  addOrder,
  clearOrder,
  handleCart,
  removeOrder,
} from "../../Store/User/UserSlice";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const Cart = () => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.user.isCartOpen);
  const orders = useSelector((state) => state.user.orders);
  const { products, accessories } = useSelector((state) => state.search);

  const getProduct = useMemo(() => {
    return orders
      .map((order) => {
        if (!order.id) {
          return { order, orderDetails: null };
        }
        let orderDetails;
        if (order?.id.startsWith("accessory-")) {
          orderDetails = accessories.find(
            (accessory) => accessory.id === order.id
          );
        } else {
          orderDetails = products.find((product) => product.id === order.id);
        }
        return { order, orderDetails };
      })
      .filter((item) => item.orderDetails);
  }, [orders, products, accessories]);

  const toggleCart = (status) => {
    dispatch(handleCart(status));
  };
  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      toggleCart(false);
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
   
    };
  }, [isCartOpen]);


  const handleAddOrders = (id) => {
    dispatch(addOrder({ id }));
  };
  const handleRemoveOrders = (id) => {
    dispatch(removeOrder({ id }));
  };
  const handleClearOrders = (id) => {
    dispatch(clearOrder({ id }));
  };
  
  const cart = {
    open: {
      x: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.4,
        ease: easeInOut,
        stiffness: 100,
      },
    },
    close: {
      x: "100%",
      backgroundColor: "rgba(0, 0, 0, 0)",
      transition: {
        duration: 0.4,
        ease: easeInOut,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div
      initial="close"
      animate={isCartOpen ? "open" : "close"}
      variants={cart}
      className={`fixed top-0 right-0  w-full h-screen  z-[888]`}
    >
      <motion.div
        ref={containerRef}
        className="cart-scrollable w-full md:w-[45%] h-full bg-white absolute top-0 right-0 divide-y-[1px]"
      >
        <div className=" w-full flex justify-between items-center px-6 py-5 text-2xl">
          <h1 className="text-4xl font-light">Cart</h1>
          <RxCross2 onClick={() => toggleCart(false)} />
        </div>
        <div className=" w-full h-4/5 flex flex-col py-2 gap-2 overflow-y-auto">
          {getProduct.map((item) => (
            <div key={item.order.id} className="h-40 w-full flex gap-6 px-3">
              <div className="h-40 w-40">
                <img
                  src={item.orderDetails.img1}
                  alt=""
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="flex flex-col justify-between py-3">
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-lg ">{item.orderDetails.name}</h1>
                  {item.orderDetails.discount ? (
                    <p>Rs.{item.orderDetails.discount?.toLocaleString()}.00</p>
                  ) : (
                    <p>Rs.{item.orderDetails.price.toLocaleString()}.00</p>
                  )}
                </div>
                <div className="w-fit flex  justify-between items-end gap-2">
                <div className=" h-8 w-fit  flex items-center border-[1px] border-black/70 text-base">
                  <div
                    className="p-2 cursor-pointer"
                    onClick={() => handleRemoveOrders(item.order.id)}
                  >
                    <FiMinus />
                  </div>
                  <p className="p-2">{item.order.quantity}</p>
                  <div
                    className="p-2 cursor-pointer"
                    onClick={() => handleAddOrders(item.order.id)}
                    >
                    <FiPlus />
                  </div>
                  
                </div>
              <p onClick={() => handleClearOrders(item.order.id)} className="cursor-pointer relative hoverEffect ">Clear</p>
                    </div>
              </div>

            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
