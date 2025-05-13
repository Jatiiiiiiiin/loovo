import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅
import "./Navbar.css";
import account from "../assets/account.png";
import wishlist from "../assets/wishlist.png";
import cart from "../assets/cart.png";
import { useCart } from "../context/Cartcontext"; // adjust the path as needed

function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // ✅

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountDropdown = () => setIsAccountOpen(!isAccountOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const navigatetologin = () => {
    setIsAccountOpen(false);
    console.log("Navigating to login");
    navigate("/login"); // ✅
  };

  const navivatetoregister = () => {
    setIsAccountOpen(false);
    console.log("Navigating to register");
    navigate("/register"); // ✅
  };

  const navigatetomen = () =>{
    console.log("Navigating to men");
    navigate("/men"); // ✅
  };

  const navigatetowomen = () =>{
    console.log("Navigating to women");
    navigate("/women")
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.account')) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
          <Link to="/" className="logo">LOOVO</Link> {/* ✅ */}
        </div>

        <nav className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a onClick={navigatetomen}>Men</a></li>
            <li><a onClick={navigatetowomen}>Women</a></li>
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/sale">Sale</a></li>
          </ul>
        </nav>

        <div className="navbar-center">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search for products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>

        <div className="navbar-right">
          <div className="wishlist" id="icon">
            <img src={wishlist} alt="" />
          </div>

          <div className="account" id="icon" onClick={toggleAccountDropdown}>
            <img src={account} alt="" />
            {isAccountOpen && (
              <div className="account-dropdown">
                <a><button onClick={navigatetologin}>Login</button></a>
                <a><button onClick={navivatetoregister}>Signup</button></a>
                <a href="/profile">My Profile</a>
                <a href="/orders">Orders</a>
              </div>
            )}
          </div>

          <Link to="/cart" className="cart" id="icon">
            <img src={cart} alt="cart" />
            <span className="cart-count">{totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
