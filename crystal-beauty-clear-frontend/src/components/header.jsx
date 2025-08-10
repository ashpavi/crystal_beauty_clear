import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <header className="w-full h-[70px] bg-gray-200 flex items-center justify-center shadow-md ">
        <GiHamburgerMenu className="text-3xl text-accent cursor-pointer absolute left-[30px] lg:hidden" onClick={() => setIsOpen(true)}/>
        <div className="w-[500px] hidden lg:flex h-full items-center justify-evenly text-[18px] text-accent">
          
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/cart" className="absolute right-[30px] text-3xl"><TiShoppingCart /></Link>
        </div>
        {
          isOpen && (
            <div className="fixed z-[999] w-full h-full left-0 top-0 bg-[#00000070] flex">
              <div className="w-[300px] h-full bg-white flex flex-col  justify-start items-start p-4">
                <GiHamburgerMenu className="text-3xl text-accent cursor-pointer " onClick={() => setIsOpen(false)} />
                <Link to="/" className="text-xl text-accent my-4">Home</Link>
                <Link to="/products" className="text-xl text-accent my-4">Products</Link>
                <Link to="/contact" className="text-xl text-accent my-4">Contact Us</Link>
                <Link to="/reviews" className="text-xl text-accent my-4">Reviews</Link>
                <Link to="/cart" className="text-3xl text-accent my-4"><TiShoppingCart /></Link>
              </div>
            </div>
          )
        }
        
      </header>
    )
  }
   