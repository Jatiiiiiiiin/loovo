"use client"

import { useState, useEffect } from "react"
import "./Testimonials.css"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I absolutely love the quality of the clothes! The fabric is soft, durable, and the fit is perfect. Will definitely be shopping here again.",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Great selection and fast shipping. The customer service was very helpful when I needed to exchange a size.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The styles are so trendy and unique! I always get compliments when I wear items from this store.",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Excellent quality for the price. The clothes hold up well after multiple washes and still look brand new.",
  },
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    function updateVisibleCount() {
      const width = window.innerWidth
      if (width >= 1024) {
        setVisibleCount(3)
      } else if (width >= 768) {
        setVisibleCount(2)
      } else {
        setVisibleCount(1)
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(testimonials.length - visibleCount, prev + 1))
  }

  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Customers Say</h2>

      <div className="testimonials-slider">
        <div
          className="testimonials-container"
          style={{ transform: `translateX(-${(currentIndex * 100) / visibleCount}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-controls">
          <button className="control-button prev" onClick={goToPrev} disabled={currentIndex === 0}>
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
          <button
            className="control-button next"
            onClick={goToNext}
            disabled={currentIndex >= testimonials.length - visibleCount}
          >
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
    </section>
  )
}

export default Testimonials
