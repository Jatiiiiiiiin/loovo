import "./CategorySection.css"
import { useNavigate, Link } from "react-router-dom"; // ✅


function CategorySection() {

  const navigate = useNavigate(); // ✅

  const navigatetomen = () =>{
    console.log("Navigating to men");
    navigate("/men"); // ✅
  };

  const navigatetowomen = () =>{
    console.log("Navigating to women");
    navigate("/women")
  };

  const navigatetoelec = () =>{
    console.log("Navigating to electronics");
    navigate("/electronics")
  };

  const navigatetofoot = () =>{
    console.log("Navigating to footwear");
    navigate("/footwear")
  }

  return (
    <section className="category-section">
      <h2 className="section-title">Shop By Category</h2>
      <div className="category-grid">
        <div className="category-card">
          <div className="category-image">
            <img src="https://media.istockphoto.com/id/1350676948/photo/low-angle-photo-of-two-young-man.jpg?s=612x612&w=0&k=20&c=eF5ZNT-L1oyPPPTDJ7UEGfczMg9AjyKFFjWWtL3xIxo=" alt="Men's Collection" />
          </div>
          <div className="category-content">
            <h3>Men's Collection</h3>
            <p>Discover our latest men's fashion with premium quality and style</p>
            <a><button onClick={navigatetomen} className="category-button men">
              Shop Men
            </button></a>
          </div>
        </div>

        <div className="category-card">
          <div className="category-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZtEO788ryWxlTXdqGREdlFnsvSM8OrdGtw&s" alt="Women's Collection" />
          </div>
          <div className="category-content">
            <h3>Women's Collection</h3>
            <p>Explore our curated women's fashion with the latest trends</p>
            <a><button onClick={navigatetowomen} className="category-button women">
              Shop Women
            </button></a>
          </div>
        </div>

        <div className="category-card">
          <div className="category-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaOXplCKkqUwGpkfi1to9oex-59ExvnL-Iw&s" alt="Accessories" />
          </div>
          <div className="category-content">
            <h3>Electronics</h3>
            <p>Complete your look with our stylish range of accessories</p>
            <a><button onClick={navigatetoelec} className="category-button electronics">
              Shop Accessories
            </button>
            </a>
          </div>
        </div>

        <div className="category-card">
          <div className="category-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7p_2ZldBCttmZjTpmipxvK4Cc8j8ig3x_Xw&s" alt="Footwear" />
          </div>
          <div className="category-content">
            <h3>Footwear</h3>
            <p>Step out in style with our premium collection of footwear</p>
            <a><button onClick={navigatetofoot} className="category-button footwear">
              Shop Footwears
            </button></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection
