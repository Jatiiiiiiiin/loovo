"use client"

import { useState, useEffect, useRef } from "react"
import "./Hero.css"
import { useNavigate } from "react-router-dom"

const slides = [
  {
    id: 1,
    image: "https://t3.ftcdn.net/jpg/07/01/91/14/240_F_701911466_X6sMFG623jtCFjXJujli2tu4k9gGZg8G.jpg",
    title: "Summer Collection 2025",
    description: "Discover the latest trends for the season",
    cta: "Shop Now",
    link: "/sale",
  },
  {
    id: 2,
    image: "https://t3.ftcdn.net/jpg/08/14/28/38/240_F_814283871_7Ex7JMo80mGLV5fCMaUqwPybRNyUVoLR.jpg",
    title: "New Arrivals",
    description: "Be the first to get our newest styles",
    cta: "Explore",
    link: "/sale",
  },
  {
    id: 3,
    image: "https://t4.ftcdn.net/jpg/12/53/72/31/240_F_1253723131_Z7BNradPeBJCitxf9j29tUDOwbOVkQ2T.jpg",
    title: "Special Offers",
    description: "Up to 50% off on selected items",
    cta: "View Deals",
    link: "/sale",
  },
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef(null)
  const navigate = useNavigate()

  const startSlideTimer = () => {
    stopSlideTimer()
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
  }

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
  }

  useEffect(() => {
    startSlideTimer()
    return () => stopSlideTimer()
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    startSlideTimer()
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    startSlideTimer()
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    startSlideTimer()
  }

  const navigatetoall = () => {
    // Add your navigation logic here
    console.log("Navigating to all collections")
    navigate("/sale")
  }
  return (
    <div className="hero">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.link} onClick={navigatetoall} className="cta-button">
                {slide.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button className="prev-button" onClick={goToPrevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
        <button className="next-button" onClick={goToNextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )

}

export default Hero
