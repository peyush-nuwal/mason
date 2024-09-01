import React from "react";
import Button from "./Button";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMeta } from "react-icons/fa6";
import { FaApplePay } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { FaAviato } from "react-icons/fa6";
import { RiVisaFill } from "react-icons/ri";
import { TfiJoomla } from "react-icons/tfi";
import { FaAtlassian } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer w-full h-4/5  bg-primary flex flex-col justify-center items-center gap-6 p-5 sm:p-8 md:p-10">
      <div className="w-full grid grid-col-1 sm:grid-col-8 md:grid-cols-10 gap-5 ">
        <div className="  col-span-1 sm:col-span-4 flex flex-col justify-center items-start gap-4 md:mr-10">
          <div className="w-full flex flex-col gap-">
            <h4 className="text-lg tracking-[4px]">NEWSLETTER</h4>
            <p className="text-sm text-gray-500">
              Sign up to our newsletter to receive exclusive offers and updates.
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div class="relative z-0 w-full mb-1 group flex flex-col justify-center">
              <input
                type="text"
                name="floating_company"
                id="floating_company"
                class="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-[1px] border-gray-500 appearance-none dark:text-black dark:border-gray-600 dark:focus:border- focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
              />
              <label
                for="floating_company"
                 className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-3 bg-primary px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                E-mail
              </label>
            </div>
            <Button
              title={"SUBSCRIBE"}
              style={{ width: 160, height: 50, fontSize: 16 }}
            />
          </div>
        </div>
        
        <div className=" col-span-1 sm:col-span-2 flex flex-col justify-start   items-start gap-3  ">
          <h4 className="text-lg">COMPANY</h4>
          <div className=" flex flex-col justify-start text-start gap-1">
            <a href="">About Us</a>
            <a href=""> Careers</a>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2  flex flex-col justify-start   items-start gap-3 ">
          <h4 className="text-lg">CUSTOMER SERVICE</h4>
          <div className=" flex flex-col items-start gap-1 ">
            <a href="">Contact</a>
            <a href="">FAQ</a>
            <a href="">Returns</a>
            <a href="">Shipping</a>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2  flex flex-col justify-start   items-start gap-3 ">
          <h4 className="text-lg">TERMS AND PRIVACY</h4>
          <div className=" flex flex-col items-start  gap-1">
            <a href=""> Privacy</a>
            <a href="">Terms of Service</a>
            <a href="">Legal Notice</a>
          </div>
        </div>
        
      </div>
      <div className="w-full flex   justify-start items-center text-xl md:text-2xl gap-5 ">
        <FaInstagram className="cursor-pointer" />
        <FaLinkedin className="cursor-pointer" />
        <FaPinterest className="cursor-pointer" />
        <FaMeta className="cursor-pointer" />
        <FaXTwitter className="cursor-pointer" />
      </div>
      <div className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between  items-center">
        <Link to="/" className="w-[20%] hidden md:block">
          <img src="src/assets/logo_black.png" alt="" />
        </Link>
        <div className="w-fit text-xs text-gray-500 text-center place-self-center">
          © 2024 - Mason Garments - ALL RIGHTS RESERVED
          
        </div>
        <div className="w-fit flex items-center justify-start sm:justify-between gap-2 cursor-pointer ">
          {[
            <FaApplePay />,
            <FaGoogle />,
            <FaPaypal />,
            <FaAviato />,
            <RiVisaFill />,
            <TfiJoomla />,
            <FaAtlassian />,
          ].map((item, index) => (
            <div
              key={index}
              className="w-10 h-6 flex flex-col justify-center items-center rounded-lg backdrop-blur-[1px] bg-black/15"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
