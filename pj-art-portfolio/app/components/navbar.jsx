import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "./cart-context";

export default function Navbar() {
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav id='navbar' className="w-full p-4 md:p-6 fixed top-0 left-0 flex items-center justify-between z-50 glass-effect">
      <div className="flex items-center">
        <Link to="/" className="text-white font-mono text-lg md:text-xl hover:text-gray-300 transition-all duration-300 text-shadow-glow">
          PJ
        </Link>
      </div>
      
      <ul className="flex gap-6 md:gap-10 text-sm md:text-lg justify-center flex-1 text-white">
        <li>
          <Link 
            to="/" 
            className="relative hover:text-gray-300 transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/gallery" 
            className="relative hover:text-gray-300 transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className="relative hover:text-gray-300 transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className="relative hover:text-gray-300 transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex justify-end items-center">
        <button onClick={toggleCart} className="relative group">
          <MdOutlineShoppingCart className="text-xl md:text-2xl cursor-pointer text-white hover:text-gray-300 transition-all duration-300 glow-hover group-hover:scale-110" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}