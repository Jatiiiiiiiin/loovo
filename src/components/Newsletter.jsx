"use client"

import { useState } from "react"
import "./Newsletter.css"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      setMessage({
        type: "success",
        text: "You've been subscribed to our newsletter!",
      })
    }, 1000)
  }

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips.</p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}
      </div>
    </section>
  )
}

export default Newsletter
