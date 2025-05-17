import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅
import "./Navbar.css";
import account from "../assets/account.png";
import {useWishlist} from "../context/WishlistContext";
import like from "../assets/like.png";
import cart from "../assets/cart.png";
import { useCart } from "../context/Cartcontext"; 
import { useAuth } from "../context/AuthContext"; // ✅
function Navbar() {

  const { logout } = useAuth();
  const { wishlist } = useWishlist();

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

  const navigatetoregister = () => {
    setIsAccountOpen(false);
    console.log("Navigating to register");
    navigate("/register"); // ✅
  };

  const navigatetomen = () => {
    console.log("Navigating to men");
    navigate("/men"); // ✅
  };

  const navigatetowomen = () => {
    console.log("Navigating to women");
    navigate("/women")
  };

  const navigatetoprofile = () => {
    setIsAccountOpen(false);
    console.log("Navigating to profile");
    navigate("/profile"); // ✅
  };


  const navigatetoorder = () => {
    setIsAccountOpen(false);
    console.log("Navigating to order");
    navigate("/order"); // ✅
  }
  const clearCart = () => {

  };

  const clearWishlist = () => {

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
  // Logout function
  const handleLogout = async () => {
    try {
      await logout();           // Firebase logout
      clearCart();              // Clear cart from state
      clearWishlist();          // Clear wishlist from state
      navigate("/login");       // Redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
          </button>
          <Link to="/" className="logo">LOOVO</Link>
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
          <Link to="/wishlist" className="wishlist" id="icon">
            <img src={like} alt="wishlist" />
            <span className="cart-count">{wishlist.length}</span> 
          </Link>

          <div className="account" id="icon" onClick={toggleAccountDropdown}>
            <img src={account} alt="" />
            {isAccountOpen && (
              <div className="account-dropdown">
                <a><button onClick={navigatetologin}>Login</button></a>
                <a><button onClick={navigatetoregister}>Signup</button></a>
                <a><button onClick={navigatetoprofile}>My Profile</button></a>
                <a><button onClick={navigatetoorder}>Orders</button></a>
                <a><button onClick={handleLogout}>Log Out</button></a>
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
