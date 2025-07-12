import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Navbar() {
  return (
    <nav id='navbar' className="w-full p-8 absolute flex items-center text-center justify-between r">

      <ul className="flex gap-10 text-xl pl-12 justify-center w-full text-white ">
        <li><Link to="/">PJ Art</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="flex justify-end pr-4 items-center ">
        <MdOutlineShoppingCart className="text-3xl cursor-pointer" />
      </div>
    </nav>
  );
}
