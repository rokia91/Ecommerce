import { useState, useEffect, useContext } from "react";
import freshlogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../context/CartContext";

export default function Navbar() {
  const { usertoken, setUsertoken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false); 
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  function handleLogout() {
    localStorage.removeItem("tkn");
    setUsertoken(null);
    navigate("/login");
  }

  return (
    <nav className="z-50 p-5 bg-cyan-700 dark:bg-gray-900 text-gray-200 dark:text-white">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-3">
          <Link>
            <img src={freshlogo} alt="freshcart" className="max-w-72"/>
          </Link>

          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>

          <ul className={`z-50 absolute top-16 left-0 w-full bg-cyan-700 dark:bg-gray-900 p-5 flex flex-col space-y-4 md:static md:flex md:flex-row md:space-x-4 md:space-y-0 md:bg-transparent dark:md:bg-transparent transition-all duration-300 ${menuOpen ? "block" : "hidden md:flex"}`}>
            {usertoken && (
              <>
                <li><NavLink to="/home" className="hover:text-gray-300">Home</NavLink></li>
                <li><NavLink to="/products" className="hover:text-gray-300">Products</NavLink></li>
                <li><NavLink to="/brands" className="hover:text-gray-300">Brands</NavLink></li>
                <li><NavLink to="/categories" className="hover:text-gray-300">Categories</NavLink></li>
                <li><NavLink to="/allorders" className="hover:text-gray-300">My Orders</NavLink></li>
              </>
            )}
          </ul>
        </div>

        <div className="flex items-center space-x-5">
          {usertoken && (
            <Link to="/cart">
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-2xl cursor-pointer"></i>
                {numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {numOfCartItems}
                  </span>
                )}
              </div>
            </Link>
          )}

          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition">
            {isDark ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
          </button>

          <ul className="flex items-center gap-2">
            {usertoken ? (
              <li>
                <span onClick={handleLogout} className="cursor-pointer hover:text-red-500 dark:hover:text-red-400">Logout</span>
              </li>
            ) : (
              <>
                <li><NavLink to="/Register" className="hover:text-gray-300">Register</NavLink></li>
                <li><NavLink to="/login" className="hover:text-gray-300">Login</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
