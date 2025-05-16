import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import FeaturedCollections from "./components/FeaturedCollections";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Login from "./components/Login";
import "./App.css";
import Men from "./pages/Men";
import Women from "./pages/Women";
import { CartProvider } from "./context/Cartcontext";
import Cart from "./components/Cart";
import Register from "./components/Register";
import { AuthProvider } from './context/AuthContext';
import AllCollection from "./pages/AllCollection";
import { WishlistProvider } from "./context/WishlistContext";
import Wish from "./components/Wish";
import AddressForm from "./components/AddressForm";
import Profile from "./pages/Profile";
import Electronics from "./pages/Electronics";
import Footwear from "./pages/Footwear";


function HomePage() {
  return (
    <>
      <Hero />
      <div className="container">
        <CategorySection />
        <FeaturedCollections />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <WishlistProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sale" element={<AllCollection />} />
              <Route path="/wishlist" element={<Wish />} />
              <Route path="/address" element={<AddressForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/electronics" element={<Electronics />} />
              <Route path="/footwear" element={<Footwear />} />
            </Routes>
            <Footer />
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
