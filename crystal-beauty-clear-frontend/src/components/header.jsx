import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

export default function Header() {
    return (
      <header className="w-full h-[70px] bg-gray-200 flex items-center justify-center shadow-md ">
        
        <div className="w-[500px] h-full flex items-center justify-evenly text-[18px] text-pink-500">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/cart" className="absolute right-[30px] text-3xl"><TiShoppingCart /></Link>
        </div>
        
      </header>
    )
  }
   