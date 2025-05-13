import "./FeaturedCollections.css"

function FeaturedCollections() {
  return (
    <section className="featured-collections">
      <h2 className="section-title">Featured Collections</h2>

      <div className="collections-grid">
        <div className="collection-card summer">
          <div className="collection-image">
            <img src="https://t4.ftcdn.net/jpg/10/51/51/95/240_F_1051519553_mZ8LdgMNAT3OXhp1NsUeMtBTqv4U68Fs.jpg" alt="Summer Essentials" />
          </div>
          <h3>Summer Essentials</h3>
          <p>Beat the heat with our curated collection of summer must-haves</p>
          <a href="/collections/summer" className="collection-link">
            Shop Collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className="collection-card activewear">
          <div className="collection-image">
            <img src="https://t4.ftcdn.net/jpg/13/77/14/69/240_F_1377146994_Hvn4IsCUvlJu4DK0ecio2es0EnKXdFBC.jpg" alt="Activewear" />
          </div>
          <h3>Activewear Collection</h3>
          <p>Performance meets style in our premium activewear range</p>
          <a href="/collections/activewear" className="collection-link">
            Shop Collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className="collection-card accessories">
          <div className="collection-image">
            <img src="https://t4.ftcdn.net/jpg/01/98/45/23/240_F_198452340_fSsuaEB3kFGNtYrnFwyxEvt3nocztUcP.jpg" alt="Accessories" />
          </div>
          <h3>Accessories</h3>
          <p>Complete your look with our stylish range of accessories</p>
          <a href="/collections/accessories" className="collection-link">
            Shop Collection
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections
