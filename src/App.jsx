import { useEffect, useState } from "react";

import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Craftsmanship from "./pages/Craftsmanship";
import Accessories from "./pages/Accessories";
import Homepage from "./pages/Homepage";
import CheckOut from "./pages/Checkout";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import useLenis from "./UseLenis";

function App() {
  const { toggleSmoothScrolling } = useLenis();



  



  return (
    <main className=" text-secondry w-full h-full ">
      <Navbar />
        <SearchBar />
        <Cart/>
      <section className="pt-16 body">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:name" element={<ProductDetail />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </section>
      <Footer />
    </main>
  );
}

export default App;
