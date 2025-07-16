import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Navbar() {
  return (
    <nav className="bg-[#D0E8F2] px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ...*/}
        <div className="flex items-center gap-3">
        <img
        src={logo}
        alt="Hope Amel Logo"
        className="h-14 w-14 object-cover rounded-full"
          />

  <h1 className="text-2xl font-bold text-[#22577A] tracking-wide">
    Hope Amel - UAE
  </h1>
</div>


        {/* ...*/}
        <ul className="flex gap-6 text-[#22577A] font-medium text-base">
          <li>
            <Link to="/about" className="hover:underline">About Us</Link>
          </li>
          <li>
            <Link to="/events" className="hover:underline">Events</Link>
          </li>
          <Link to="/donate" className="bg-[#FFE066] hover:bg-[#FFB703] px-4 py-1 rounded-full transition text-[#22577A]">
            Donate
            </Link>

          
        </ul>
      </div>
    </nav>
  );
}
